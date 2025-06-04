const express = require('express');
const cors = require('cors');
const { ServiceBusClient } = require("@azure/service-bus");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/rental', async (req, res) => {
  const { name, email, model, year, rentalDuration } = req.body; // Added model, year, rentalDuration
  console.log('Received request with body:', req.body); // Log incoming request

  const messageContent = {
    name,
    email,
    model, // Use model from req.body
    year, // Use year from req.body
    rentalDuration, // Use rentalDuration from req.body
    date: new Date().toISOString(),
  };

  try {
    const serviceBusConnection = process.env.SERVICE_BUS_CONNECTION_STRING;
    if (!serviceBusConnection) {
        console.error('SERVICE_BUS_CONNECTION_STRING environment variable is not set.');
        throw new Error('Server configuration error: Service Bus Connection String not set');
    }
    console.log('Service Bus Connection String retrieved from env (first few chars):', serviceBusConnection.substring(0, 30) + '...'); // Log part of the string for verification, not the whole thing for security

    const sbClient = new ServiceBusClient(serviceBusConnection);
    console.log('ServiceBusClient initialized.');
    const sender = sbClient.createSender("queue-rental");
    console.log('ServiceBus Sender created for "queue-rental".');

    const message = {
      body: messageContent,
      contentType: "application/json",
    };

    console.log('Attempting to send message to Service Bus...');
    await sender.sendMessages(message);
    console.log('Message sent successfully to Service Bus.');
    await sender.close();
    await sbClient.close();
    console.log('Service Bus sender and client closed.');

    res.status(200).send("Rental sent to the queue successfully");
  } catch (err) {
    console.error("Detailed error in /api/rental:", err); // More detailed error logging
    res.status(500).json({ message: 'Internal server error', error: err.message, stack: err.stack }); // Send stack trace in dev
  }
});

app.listen(5001, () => console.log("Backend For Frontend (BFF) running on port 5001"));