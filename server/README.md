# Server

This is a nodeJS based server for the CRM project.

## Features

## API

### Authentication (v1)

| Method | URL                           | Description    |
| ------ | ----------------------------- | -------------- |
| POST   | `/api/v1/auth/register`       | Register User  |
| POST   | `/api/v1/auth/login`          | Login User     |
| POST   | `/api/v1/auth/logout`         | Logout User    |
| POST   | `/api/v1/auth/reset-password` | Reset Password |

### Users (v1)

| Method | URL                  | Description         |
| ------ | -------------------- | ------------------- |
| GET    | `/api/v1/users`      | Get all users       |
| GET    | `/api/v1/users/:uid` | Get a specific user |
| PUT    | `/api/v1/users/:uid` | Update a user       |
| DELETE | `/api/v1/users/:uid` | Delete a user       |

### Customers (v1)

| Method | URL                     | Description             |
| ------ | ----------------------- | ----------------------- |
| GET    | `/api/v1/customers`     | Get all customers       |
| GET    | `/api/v1/customers/:id` | Get a specific customer |
| POST   | `/api/v1/customers`     | Create a new customer   |
| PUT    | `/api/v1/customers/:id` | Update a customer       |
| DELETE | `/api/v1/customers/:id` | Delete a customer       |

### Sales (v1)

| Method | URL                 | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/v1/sales`     | Get all sales       |
| GET    | `/api/v1/sales/:id` | Get a specific sale |
| POST   | `/api/v1/sales`     | Create a new sale   |
| PUT    | `/api/v1/sales/:id` | Update a sale       |
| DELETE | `/api/v1/sales/:id` | Delete a sale       |
