# CRM Web Application

## Overview

This is a **Customer Relationship Management (CRM)** web application built using **Google Cloud Platform (GCP)** and modern web technologies. It provides user and customer management features with secure authentication.

## The reason of this project

While I was working in a grocery store, I always thing 'is there any better idea to see stocks, vendors, and other details?'
This is the project if I imagine I have to create a CRM software with my needs

## Tech Stack

- **Frontend & Backend:** React
- **Programming Languages:** JavaScript, TypeScript
- **Server & API:** [Node.js](https://nodejs.org/)
- **Database:** NoSQL - [Firestore](https://firebase.google.com/docs/firestore)
- **Authentication:** Firebase Authentication for Web
- **Cloud Platform:** Google Cloud Platform (GCP)
- **Test:** Cypress

### Future Tech Stack

- **Server & API:** Python Django or FastAPI for Items and Stocks
- **Database:** RDBMS - SQL

#### Considerations

Django:
A full-fledged framework providing an "all-in-one" solution for web development. It includes an ORM, templating engine, and admin interface out-of-the-box. Django is well-suited for large, complex applications.

- Pros: Feature-rich, robust, follows the DRY principle, has a large community and extensive documentation.
- Cons: Can be overkill for small projects, steeper learning curve, less flexible than Flask.

FastAPI:
A modern, high-performance framework designed for building APIs. It leverages Python type hints for data validation and automatic documentation generation. FastAPI excels in speed and efficiency, making it ideal for microservices and data-intensive applications.

- Pros: High performance, automatic data validation and documentation, asynchronous support, easy to use for API development.
- Cons: Relatively new, smaller community compared to Django and Flask, might not be suitable for traditional web applications with server-side rendering.

## Features

- User authentication with Firebase Authentication
- Customer data management with Firestore NoSQL database
- Secure API routes for user and customer operations

## Project Structure

```
📂 crm_system
 ├── 📁 client
 │   ├── 📁 components
 │   ├── 📁 data
 │   ├── 📁 models
 │   ├── 📁 pages
 │   ├── 📁 utils
 ├── 📁 server
 │   ├── 📁 controllers
 │   ├── 📁 middleware
 │   ├── 📁 models
 │   ├── 📁 routers
 │   └── 📁 util
 ├── 📄 .env
 ├── 📄 package.json
 └── 📄 README.md
```

## Installation & Setup

### Prerequisites

- Node.js (>= 16)
- Firebase project setup
- Google Cloud SDK

### Steps

1. **Clone the repository**

2. **Install dependencies**

   ```sh
   npm install
   ```

3. **Set up environment variables**

   - Create a `.env` file in the root directory
   - Add Firebase and other configuration details:
     ```env
     FIREBASE_API_KEY=your_api_key
     FIREBASE_AUTH_DOMAIN=your_auth_domain
     FIREBASE_PROJECT_ID=your_project_id
     FIREBASE_STORAGE_BUCKET=your_storage_bucket
     FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     FIREBASE_APP_ID=your_app_id
     ```

4. **Run the development server**
   ```sh
   npm run dev
   ```
   The application will be available at `http://localhost:3300`
