# Car Rental Service

A cloud-native microservice-based application for car rental management built with Node.js and Azure cloud services. This project was developed as part of the Microsoft Cloud Native Bootcamp by DIO.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Deployment](#deployment)
- [API Endpoints](#api-endpoints)
- [Docker](#docker)
- [Azure Resources](#azure-resources)
- [Development](#development)
- [License](#license)

## 🔍 Overview

This Car Rental Service is a backend for frontend (BFF) application that processes car rental requests and sends them to an Azure Service Bus queue for further processing. It demonstrates cloud-native principles and Azure service integration.

## 🏗️ Architecture

The application follows a microservices architecture:

1. **Frontend**: Not included in this repository, but expected to interact with this BFF service.
2. **BFF (Backend For Frontend)**: This Node.js Express application exposed as API endpoints.
3. **Azure Service Bus**: Queues for asynchronous message processing.
4. **Azure Container Apps**: For hosting the containerized application.
5. **Azure Container Registry**: For storing and managing Docker container images.

## 🛠️ Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Docker](https://www.docker.com/)
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- An active Azure subscription
- Azure Service Bus namespace with a queue named `queue-rental`

## 📦 Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/CarRental.git
   cd CarRental
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following variables:
   ```
   SERVICE_BUS_CONNECTION_STRING=your_service_bus_connection_string
   ```

## ⚙️ Configuration

The application requires the following environment variables:

| Variable | Description |
|----------|-------------|
| SERVICE_BUS_CONNECTION_STRING | Azure Service Bus connection string. You can get this from Azure Portal. |

## 🚀 Deployment

### Local Development

To run the application locally:

```bash
node index.js
```

The server will start on port 5001 and can be accessed at http://localhost:5001.

### Docker Container

Build and run the Docker container:

```bash
docker build -t bff-rent-car-local .
docker run -p 5001:5001 -e SERVICE_BUS_CONNECTION_STRING=your_connection_string bff-rent-car-local
```

### Azure Container Apps Deployment

The project includes PowerShell commands for deploying to Azure Container Apps:

1. Login to Azure Container Registry:
   ```bash
   az acr login --name carrentalacr --resource-group CarRentalService
   ```

2. Tag the Docker image:
   ```bash
   docker tag bff-rent-car-local carrentalacr.azurecr.io/bff-rent-car-local:v1
   ```

3. Push the Docker image to Azure Container Registry:
   ```bash
   docker push carrentalacr.azurecr.io/bff-rent-car-local:v1
   ```

4. Create a Container App environment:
   ```bash
   az containerapp env create --name bff-rent-car-local --resource-group CarRentalService --location centralindia
   ```

5. Create the Container App:
   ```bash
   az containerapp create --name bff-rent-car-local --resource-group CarRentalService --environment bff-rent-car-local --image carrentalacr.azurecr.io/bff-rent-car-local:v1 --target-port 5001 --ingress 'external' --registry-server carrentalacr.azurecr.io --system-assigned
   ```

## 📡 API Endpoints

### POST /api/rental

Creates a new car rental request and sends it to the Service Bus queue.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "model": "Toyota Camry",
  "year": 2023,
  "rentalDuration": 7
}
```

**Response:**
- 200 OK: "Rental sent to the queue successfully"
- 500 Internal Server Error: Error details

## 🐳 Docker

The application is containerized using Docker. The Dockerfile is simple and straightforward:

```dockerfile
FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
```

## ☁️ Azure Resources

This project uses the following Azure resources:

1. **Azure Service Bus**: For queueing car rental requests
2. **Azure Container Registry (ACR)**: For storing the Docker container image
3. **Azure Container Apps**: For hosting the containerized application

## 💻 Development

### Project Structure

```
CarRental/
├── index.js             # Main application entry point
├── package.json         # Node.js dependencies
├── Dockerfile           # Docker container configuration
├── commands.ps1         # PowerShell commands for Azure deployment
├── .env                 # Environment variables (not tracked in git)
└── README.md            # This documentation
```

### Dependencies

- Express: Web server framework
- Azure Service Bus SDK: For interacting with Azure Service Bus
- CORS: For handling cross-origin requests
- dotenv: For loading environment variables
