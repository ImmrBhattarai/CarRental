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

## Screenshots of the project
![Screenshot From 2025-05-09 12-27-18](https://github.com/user-attachments/assets/8fcf0e3b-4928-4a46-8265-fe0fa0e646be)
![Screenshot From 2025-05-09 12-32-28](https://github.com/user-attachments/assets/499f7f3a-e867-431e-852a-6ecdee4d16f5)
![Screenshot From 2025-05-09 12-33-49](https://github.com/user-attachments/assets/c6761a45-ba58-407e-a1af-4f21779f517d)
![Screenshot From 2025-05-09 12-34-03](https://github.com/user-attachments/assets/ae72f68b-185a-4eab-9df9-50a364252ce6)
![Screenshot From 2025-05-09 13-40-32](https://github.com/user-attachments/assets/12c648f8-245d-4fc3-882b-4d75f4e3673c)
![Screenshot From 2025-05-09 13-43-20](https://github.com/user-attachments/assets/575242d8-2bba-4532-8b74-4cfc87035950)
![Screenshot From 2025-05-09 13-47-04](https://github.com/user-attachments/assets/8ba7428e-0cda-4d9e-bf3c-99fbceed174f)
![Screenshot From 2025-05-09 14-30-22](https://github.com/user-attachments/assets/431ab0e7-a0e8-4b43-92c4-422021c3cd37)
![Screenshot From 2025-05-09 14-34-59](https://github.com/user-attachments/assets/042c1019-04d3-4700-959e-165aadf126fe)
![Screenshot From 2025-05-09 16-14-07](https://github.com/user-attachments/assets/090d5ed5-61f6-48c8-afbe-2a98d34bd87c)
![Screenshot From 2025-05-09 16-42-07](https://github.com/user-attachments/assets/ba269c18-d122-4341-a1a7-9175f19a635c)
![Screenshot From 2025-05-09 16-46-52](https://github.com/user-attachments/assets/1c389dce-c023-47e9-af70-e7c0ced4f9ee)
![Screenshot From 2025-05-09 16-55-30](https://github.com/user-attachments/assets/7fa898ce-a10b-486f-a88f-14074de9034e)
![Screenshot From 2025-05-09 16-59-38](https://github.com/user-attachments/assets/a7ebde28-0930-4518-8e9b-4b81304cf7ea)
![Screenshot From 2025-05-09 17-01-42](https://github.com/user-attachments/assets/3eed59b8-be3e-4410-963e-8fa5f32ce4a0)
![Screenshot From 2025-05-09 17-24-01](https://github.com/user-attachments/assets/b76870f8-dde7-407d-8415-457197cdbe31)
![Screenshot From 2025-05-09 18-42-43](https://github.com/user-attachments/assets/56fc6a30-6391-44ef-b817-5db9bc1a49c1)
![Screenshot From 2025-05-09 19-06-03](https://github.com/user-attachments/assets/867c3f60-3476-4722-bc3c-549d6a855fc8)
![Screenshot From 2025-05-09 20-27-41](https://github.com/user-attachments/assets/c042ef31-1786-41f6-a4ca-d42873feb96d)
![Screenshot From 2025-05-09 21-10-42](https://github.com/user-attachments/assets/f27713c8-80ef-4999-94bd-29e75e80f2b2)
![Screenshot From 2025-05-11 14-53-13](https://github.com/user-attachments/assets/43881e1e-acc9-470b-8adc-ee8eb6633ef8)
![Screenshot From 2025-05-11 14-55-57](https://github.com/user-attachments/assets/92f4653e-efb9-47dc-b907-6d2d88767e37)
![Screenshot From 2025-05-11 15-02-11](https://github.com/user-attachments/assets/504cbe51-ce45-425a-b2eb-5a54c1f7c909)
![Screenshot From 2025-05-11 16-43-14](https://github.com/user-attachments/assets/96c3f1bf-2288-4065-bb55-6ee897cd4508)
![Screenshot From 2025-05-11 16-56-56](https://github.com/user-attachments/assets/63d1797b-126b-40fc-9502-0465cf257a6f)
