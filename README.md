# Photography Service Web Application

[![License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](https://opensource.org/licenses/MIT)

## Overview
A full-stack web application for a photography service, featuring a modern user interface and a robust backend. The project consists of a React client built with Vite and Tailwind CSS, and a Node.js Express server utilizing both MySQL (via Docker) and MongoDB.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need the following software installed on your system:
- **Node.js**: [Download and install Node.js](https://nodejs.org/) (v18+ recommended)
- **Docker & Docker Compose**: [Download and install Docker](https://www.docker.com/products/docker-desktop) (for the local MySQL database)

```bash
# Verify Node.js and npm installation
node -v
npm -v

# Verify Docker installation
docker -v
docker-compose -v
```

### Installing

A step by step on how to install the project and set up the development environment.

**1. Clone the repository (if not already done)**

```bash
git clone <repository-url>
cd photography_service
```

**2. Setup the Local Database**

Start the MySQL database using Docker Compose. The `docker-compose.yml` file is configured to automatically run the `photography_service.sql` initialization script.

```bash
docker-compose up -d
```

**3. Setup and Run the Server**

Navigate to the `server` directory, install the required dependencies, and start the Express backend server.

```bash
cd server
npm install
npm run dev
```

*(Note: The server uses environment variables from the `.env` file which includes database credentials and JWT secrets.)*

**4. Setup and Run the Client**

Open a new terminal window, navigate to the `client` directory, install the required dependencies, and start the Vite development server.

```bash
cd client
npm install
npm run dev
```

You can now view the application in your browser at the URL provided by Vite (usually `http://localhost:5173`).

## Tests

Automated testing is not currently configured. For manual testing of the API endpoints, you can use the included `test.http` file with a REST client tool (like the REST Client extension for VS Code).

## Deployment

Add additional notes about how to deploy this on a local machine and in a cloud provider.
- **Client**: Build the frontend (`npm run build` in the `client` folder) and host the static files on Vercel, Netlify, or Firebase Hosting.
- **Server**: Deploy the Node.js backend to platforms like Render, Railway, or Heroku. Ensure you configure the production environment variables appropriately.
- **Database**: Instead of local Docker containers, use managed cloud databases such as AWS RDS for MySQL and MongoDB Atlas for MongoDB.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Release History
- 1.0.0
  - Initial setup of Client (React/Vite) and Server (Node/Express).
  - Database configuration with MySQL (Docker) and MongoDB.

## Authors

- **Egbert** - *Initial work*