# CRM Web Application

## Overview
This is a **Customer Relationship Management (CRM)** web application built using **Google Cloud Platform (GCP)** and modern web technologies. It provides user and customer management features with secure authentication.

## Tech Stack
- **Frontend & Backend:** [Next.js](https://nextjs.org/) (React + Server-side Rendering)
- **Programming Languages:** JavaScript, TypeScript
- **Server & API:** [Node.js](https://nodejs.org/)
- **Database:** NoSQL - [Firestore](https://firebase.google.com/docs/firestore)
- **Authentication:** Firebase Authentication for Web
- **Cloud Platform:** Google Cloud Platform (GCP)

## Features
- User authentication with Firebase Authentication
- Customer data management with Firestore NoSQL database
- Secure API routes for user and customer operations
- Scalable and server-rendered using Next.js

## Project Structure
<!---
```
📂 crm_system
 ├── 📁 client
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
-->

## Installation & Setup

### Prerequisites
- Node.js (>= 16)
- Firebase project setup
- Google Cloud SDK (if deploying to GCP)

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
