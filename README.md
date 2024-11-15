

# MEAN Stack Application

This project is a web application built using the MEAN stack (MongoDB, Express, Angular, and Node.js). The application allows users to register, authenticate, and manage data stored in MongoDB. It includes separate backend and frontend components, with the backend providing a REST API that the Angular frontend consumes.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Docker Usage](#docker-usage)

## Features

- User authentication (registration and login)
- Interactive UI built with Angular
- API for data manipulation
- Logging and error handling

## Technologies

- **Frontend**: Angular, TypeScript, Bootstrap for styling
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Others**: Docker for containerization, Nginx (if used for reverse proxy)

## Prerequisites

- **Node.js** and **npm**
- **MongoDB** (or Docker for running MongoDB in a container)
- **Angular CLI** (for building and serving the frontend)
- Docker (optional but recommended)

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd <repo-directory>
   ```

2. **Install dependencies for both frontend and backend**:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. **Set up MongoDB**:
   - Install MongoDB locally, or
   - Use Docker to run MongoDB as a container.

## Environment Variables

Configure your environment variables in a `.env` file at the root of the backend directory. The required variables are:

```plaintext
MONGODB_URI=mongodb://<host>:<port>/<database>
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

## Running the App

### Backend

1. **Start MongoDB** (if not running in Docker).
2. **Run the backend server**:
   ```bash
   cd backend
   npm start
   ```

   The backend will be accessible at `http://localhost:5000/api`.

### Frontend

1. **Configure the API URL** in the frontend environment (usually in `src/environments/environment.ts`).
2. **Run the Angular frontend**:
   ```bash
   cd frontend
   ng serve
   ```
   The frontend will be available at `http://localhost:4200`.

## Project Structure

- **backend**: Contains Express API code and MongoDB-related configurations.
- **frontend**: Contains Angular code and UI components.

### Backend Structure

```plaintext
backend
├── models          # Mongoose models
├── routes          # API routes
└── server.js       # Express app entry point
```

### Frontend Structure

```plaintext
frontend
├── src
│   ├── app             # Angular components, services, etc.
│   ├── environments    # Environment configurations
│   └── assets          # Static files
└── angular.json        # Angular project configuration
```

## API Endpoints

The backend exposes several API endpoints under `/api`, including:

- **Auth**: `/api/auth/register`, `/api/auth/login`

Refer to the code for specific endpoint documentation.

## Docker Usage

A `docker-compose.yml` file is included to simplify deployment with Docker.

### Running with Docker Compose

1. **Run the containers**:
   ```bash
   docker-compose up
   ```

   This will start MongoDB, the backend, and the frontend in Docker containers.

2. **Access the application**:
   - Backend: `http://localhost:5000/api`
   - Frontend: `http://localhost:4200`

3. **Stopping the containers**:
   ```bash
   docker-compose down
   ```

## Notes

- Ensure that the MongoDB instance is running before starting the backend.
- The frontend and backend can be customized for different environments via Angular environment files and the backend `.env` configuration.

---

This README should cover all key points for getting the app up and running. Let me know if you’d like any additional sections!
