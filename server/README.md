# Server

This is a nodeJS based server for the CRM project.

## Feature

## APi

### User

| Method | URL                         | Description         |
| ------ | --------------------------- | ------------------- |
| POST   | `/api/register/`            | Register User       |
| POST   | `/api/login/`               | Login User          |
| POST   | `/api/logout/`              | Logout User         |
| POST   | `/api/reset-password/`      | Reset Password      |
| GET    | `/api/user/get-info/`       | Get a list of user  |
| GET    | `/api/user/get-info/:id`    | Get a specific user |
| PUT    | `/api/user/update-info/:id` | Update a user       |
| DELETE | `/api/user/delete-info/:id` | Delete a user       |

### Customer

| Method | URL                             | Description             |
| ------ | ------------------------------- | ----------------------- |
| GET    | `/api/customer/get-info/`       | Get a list of customer  |
| GET    | `/api/customer/get-info/:id`    | Get a specific customer |
| POST   | `/api/customer/create-info/`    | Add a new customer      |
| PUT    | `/api/customer/update-info/:id` | Update a customer       |
| DELETE | `/api/customer/delete-info/:id` | Delete a customer       |

### Sales

| Method | URL                          | Description          |
| ------ | ---------------------------- | -------------------- |
| GET    | `/api/sales/get-info/`       | Get a list of sales  |
| GET    | `/api/sales/get-info/:id`    | Get a specific sales |
| POST   | `/api/sales/create-info/`    | Add a new sales      |
| PUT    | `/api/sales/update-info/:id` | Update a sales       |
| DELETE | `/api/sales/delete-info/:id` | Delete a sales       |
