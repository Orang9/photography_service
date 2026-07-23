# Aynfaal Lens - Photography Booking & Transaction Management

[![License](https://img.shields.io/badge/license-MIT-orange.svg?style=flat-square)](https://raw.githubusercontent.com/compbiocore/cbc-documentation-templates/master/LICENSE.md)  
[![React](https://img.shields.io/badge/React-18-blue.svg?style=flat-square)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg?style=flat-square)](https://nodejs.org/)

## 1. Project Title & Description
**Aynfaal Lens** is a comprehensive Photography Booking and Transaction Management system. It facilitates seamless interactions between clients and photographers, enabling users to browse photography packages, make bookings, and track the progress of their transactions. The platform also provides an administrative backend for managing photographers, jobs, schedules, and portfolios.

## Live Deployment / Access
The application is successfully deployed and accessible to the public via the following links:
- **Frontend Application**: [https://photography.thrqrhmn.my.id](https://photography.thrqrhmn.my.id)
- **Backend API**: [https://be-photograpy.thrqrhmn.my.id](https://be-photograpy.thrqrhmn.my.id)

---

## 2. Tech Stack

### Frontend
- **React (v19.2)**: User interface library for building dynamic components.
- **TailwindCSS (v4)**: Utility-first CSS framework for rapid and responsive UI styling.
- **Vite**: Next-generation frontend tooling for fast development and build times.
- **React Router DOM**: Declarative routing for React applications.
- **Axios**: Promise-based HTTP client for API requests.
- **Lucide React**: Beautiful and consistent icon toolkit.

### Backend
- **Node.js**: JavaScript runtime for building scalable network applications.
- **Express (v5)**: Fast, unopinionated, minimalist web framework for Node.js.
- **Joi**: Data validation library for ensuring API request payload integrity.
- **Bcrypt**: Library for hashing and securing user passwords.
- **JSON Web Token (JWT)**: Standard for securely transmitting information and handling authentication.

### Database
- **MySQL (mysql2)**: Relational database used for structured data (e.g., users, transactions, packages).
- **MongoDB Atlas (mongoose, mongodb)**: NoSQL database used for flexible, document-based data storage.

### Deployment & Tools
- **Docker**: Containerization platform to package the application and its dependencies.
- **Docker Compose**: Tool for defining and running multi-container Docker applications.
- **Nginx**: Web server used in the frontend Docker setup.

---

## 3. System Architecture & Folder Structure

```text
photography_service/
├── client/                  # Frontend React Application (Vite)
│   ├── src/                 
│   │   ├── assets/          # Static assets like images and global styles
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React Context for global state management
│   │   ├── data/            # Static data and mock constants
│   │   ├── hooks/           # Custom React hooks for business logic
│   │   ├── pages/           # Application views/pages
│   │   ├── routes/          # Frontend routing configuration
│   │   ├── services/        # API integration and Axios wrappers
│   │   ├── styles/          # TailwindCSS and custom styling files
│   │   └── utils/           # Helper functions and utilities
│   ├── Dockerfile           # Docker configuration for frontend
│   └── package.json         # Frontend dependencies and scripts
├── server/                  # Backend Express Application
│   ├── src/                 
│   │   ├── config/          # Database connections and environment setups
│   │   ├── controllers/     # Request handlers and business logic
│   │   ├── middlewares/     # Express middlewares (Auth, Validation)
│   │   ├── models/          # Database schema models (MySQL & MongoDB)
│   │   ├── routes/          # REST API route definitions
│   │   └── services/        # Core reusable business logic
│   ├── Dockerfile           # Docker configuration for backend
│   └── package.json         # Backend dependencies and scripts
└── docker-compose.yml       # Multi-container orchestration (MySQL, Backend, Frontend)
```

---

## 4. Local Development (Optional)

*(Note: This section is only for developers who want to contribute or run the project locally. Regular users can access the application directly via the Live Deployment links above.)*

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd photography_service
   ```

2. **Environment Configuration**
   - Navigate to both the `client` and `server` directories and create a `.env` file based on the templates provided in the **Environment Variables** section below.

3. **Running with Docker Compose (Recommended)**
   To spin up the entire application (MySQL database, Node.js Backend, and React Frontend) inside Docker containers:
   ```bash
   docker-compose up --build -d
   ```
   - The Frontend will be available at `http://localhost:80` (or `http://localhost`).
   - The Backend API will be available at `http://localhost:3000`.

4. **Running Locally (Manual Setup)**
   If you prefer running without Docker:
   - **Backend**:
     ```bash
     cd server
     npm install
     npm run dev
     ```
   - **Frontend**:
     ```bash
     cd client
     npm install
     npm run dev
     ```
   *(Note: You will need to ensure a local MySQL server is running if not using Docker)*

---

## 5. Environment Variables

Create `.env` files in their respective directories and fill in the necessary values.

### Server (`server/.env`)
```env
# Application Port
PORT=3000

# MySQL Database Configuration
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=photography_service

# Authentication
JWT_SECRET=your_super_secret_jwt_key

# MongoDB Configuration
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/
```

### Client (`client/.env`)
```env
# Backend API URL
VITE_API_URL=https://be-photograpy.thrqrhmn.my.id

# CORS Setting
CORS_ORIGIN=https://photography.thrqrhmn.my.id
```

---

## 6. Key Features & API Endpoints

### Key Features
- **User Authentication**: Secure Login & Registration using JWT tokens with role-based access control (Client, Admin, Photographer).
- **Package Management**: Browse and manage different photography service packages.
- **Booking & Transactions**: Users can book packages. Admins can verify payments, request down payments, or reject bookings with specific reasons.
- **Job Tracking**: Assign jobs to photographers and track the status (e.g., editing, completed) of specific projects.
- **Portfolio & Reviews**: Showcase photographer portfolios and manage client reviews.

### Core API Endpoints

**Users & Authentication (`/api/users`)**
- `POST /api/users/login` - Authenticate user & get JWT token
- `POST /api/users` - Register a new user
- `GET /api/users` - Retrieve all users
- `GET /api/users/:id` - Retrieve a specific user
- `PUT /api/users/:id` - Update user profile
- `DELETE /api/users/:id` - Delete a user

**Packages (`/api/packages`)**
- `GET /api/packages` - Retrieve all available packages
- `POST /api/packages` - Create a new package (Admin)
- `GET /api/packages/:id` - Retrieve specific package details
- `PUT /api/packages/:id` - Update package details
- `DELETE /api/packages/:id` - Remove a package

**Transactions / Booking (`/api/transactions`)**
- `GET /api/transactions` - Retrieve all transactions (Admin)
- `GET /api/transactions/user/:userId` - Retrieve user-specific transactions
- `POST /api/transactions` - Create a new booking/transaction
- `PUT /api/transactions/:id` - Update transaction status (e.g., verify payment, decline)
- `DELETE /api/transactions/:id` - Delete a transaction

**Jobs / Photographer Assignments (`/api/jobs`)**
- `GET /api/jobs` - Retrieve all job assignments
- `GET /api/jobs/:id` - Retrieve specific job details
- `PUT /api/jobs/:id` - Update job status (e.g., editing, finished)
