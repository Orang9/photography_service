# Photography Service Web Application

[![License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](https://raw.githubusercontent.com/compbiocore/cbc-documentation-templates/master/LICENSE.md)  
[![React](https://img.shields.io/badge/React-18-blue.svg?style=flat-square)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg?style=flat-square)](https://nodejs.org/)

## Overview
A full-stack web application for a photography service business. It features a modern, responsive user interface built with React, Vite, and Tailwind CSS. The backend is a robust Node.js Express server that utilizes MySQL for structured transaction data and MongoDB for flexible document storage. 

Key features include client booking flow, payment proof upload, dynamic project tracking, and an admin dashboard for verifying schedules and processing decline/approval logic.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need the following software installed on your system:
- **Node.js**: [v18 or higher](https://nodejs.org/) 
- **Docker & Docker Compose**: [Docker Desktop](https://www.docker.com/products/docker-desktop) (for the local MySQL database)

```bash
# Verify Node.js and npm installation
node -v
npm -v

# Verify Docker installation
docker -v
docker-compose -v
```

### Installing

A step-by-step guide to install the project and set up the development environment.

**1. Clone the repository**
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
Navigate to the `server` directory, install dependencies, and run the database seeders.
```bash
cd server
npm install

# Run database seeders to populate initial dummy data
node seeders/runAllSeeders.js

# Start backend server
npm run dev
```

**4. Setup and Run the Client**
Open a new terminal window, navigate to the `client` directory, and start the Vite server.
```bash
cd client
npm install
npm run dev
```

You can now view the application at `http://localhost:5173`.

## Tests

Automated testing is not currently configured. For manual API testing, use the included `test.http` file with a REST client extension (e.g., VS Code REST Client).

## Deployment

Add additional notes about how to deploy this on a local machine and in a cloud provider.

- **Client**: Build the frontend (`npm run build` in the `client` folder) and host static files on Vercel, Netlify, or Firebase Hosting.
- **Server**: Deploy the Node.js backend to platforms like Render or Heroku. Configure environment variables (`.env`) for production.
- **Database**: Use managed cloud databases such as AWS RDS (MySQL) and MongoDB Atlas (MongoDB) instead of local Docker containers.

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Release History

- **1.1.0**
  - Implemented Decline Reason logic for rejected payments/schedules.
  - Added Auto-logout mechanism after 15 minutes of inactivity.
  - Integrated dynamic Project Tracker timeline on the client dashboard.
- **1.0.0**
  - Initial setup of Client (React/Vite) and Server (Node/Express).
  - Database configuration with MySQL (Docker) and MongoDB.

## Authors

- **Fika Egbert Felica Wibianto** - *Full Stack Developer*
