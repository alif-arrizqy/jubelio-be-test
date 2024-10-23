# PT Kelola Bersama Webstore Backend

## Overview

This project is a backend system for PT Kelola Bersama's webstore. It is built using Hapi.js, TypeScript, and PostgreSQL. The system includes functionalities for user authorization, product management, location management, and inventory management. It also includes logging, audit trail, and health and readiness checks to ensure the application meets production criteria.

## Features

1. **Authorization**: User registration and login with JWT-based authentication.
2. **Products**: CRUD operations for products.
3. **Locations**: CRUD operations for warehouse locations.
4. **Inventory**: Stock adjustments, inventory transactions, and total stock management.
5. **Logging**: Comprehensive logging using Pino.
6. **Audit Trail**: Logs significant actions performed by users.
7. **Health and Readiness Checks**: Endpoints to check the health and readiness of the application.

## Prerequisites

- Node.js (>= 14.x)
- PostgreSQL (>= 12.x)
- npm (>= 6.x)

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/jubelio-be-test.git
cd jubelio-be-test
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Configure Environment Variables

Create a .env file in the root directory and add the following environment variables:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=jubelio_inventory
JWT_SECRET=secret_key

PORT=3005

DATABASE_URL=postgres://user:password@localhost:5432/jubelio_inventory
```

### 4. Setup PostgresSQL Database

Ensure PostgreSQL is running and create a database named `jubelio_inventory`.

### 5. Run Migrations
```sh
npm run migrate up
```

### 6. Build the Project
```sh
npm run build
```

### 7. Run the Server
```sh
npm run start
```

The server should now be running at `http://localhost:3005`.

### API Endpoint

#### Authorization

- Register: `POST /api/user/register`
- Login: `POST /api/user/login`

#### Products

- Create Product: `POST /api/products`
- Get Products: `GET /api/products`
- Get Product by ID: `GET /api/products/{id}`
- Update Product: `PUT /api/products/{id}`
- Delete Product: `DELETE /api/products/{id}`


#### Locations
- Create Location: `POST /api/locations`
- Get Locations: `GET /api/locations`
- Get Location by ID: `GET /api/locations/{id}`
- Update Location: `PUT /api/locations/{id}`
- Delete Location: `DELETE /api/locations/{id}`


#### Inventory
- Create Stock Adjustment: `POST /api/inventory/adjustment`
- Get Inventory Transactions: `GET /api/inventory/transactions`
- Get Total Stock: `GET /api/inventory/total`
- Get Total Stock by Location: `GET /api/inventory/total/{locationId}`

#### Health and Readiness Checks
- Health Check: `GET /health`
- Readiness Check: `GET /readiness`

#### Logging

Logging is implemented using Pino. Logs are printed to the console in a human-readable format. The log level can be configured using the LOG_LEVEL environment variable.

### Audit Trail

Significant actions performed by users are logged in the audit_trail table in the database. The audit trail includes information about the HTTP method, URL, payload, user, and action type.

#### Health and Readiness Checks

The application includes endpoints to check its health and readiness status. The health check endpoint (/health) returns a simple status indicating whether the application is running. The readiness check endpoint (/readiness) checks the database connection to ensure the application is ready to handle requests.

#### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

#### License

This project is licensed under the MIT License.


### Summary

This README file provides a comprehensive overview of the project, including setup instructions, API endpoints, project structure, logging, audit trail, and health and readiness checks. It ensures that anyone setting up or contributing to the project has all the necessary information.
