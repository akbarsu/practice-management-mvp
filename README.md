# Practice Management MVP

A comprehensive web-based application designed to streamline administrative tasks for healthcare practices, specifically dental clinics. This Minimum Viable Product (MVP) focuses on enhancing efficiency by automating processes such as appointment scheduling, invoice management, insurance verification, and more.

---

## Table of Contents

1. [Introduction](#introduction)
2. [Project Structure](#project-structure)
3. [System Architecture](#system-architecture)
   - [High-Level Overview](#high-level-overview)
   - [Backend Architecture](#backend-architecture)
   - [Frontend Architecture](#frontend-architecture)
4. [Technology Stack](#technology-stack)
   - [Frontend Technologies](#frontend-technologies)
   - [Backend Technologies](#backend-technologies)
   - [Third-Party Integrations](#third-party-integrations)
5. [Database Design](#database-design)
   - [Data Models](#data-models)
   - [Entity-Relationship Diagram](#entity-relationship-diagram)
6. [API Endpoints](#api-endpoints)
7. [Module Breakdown](#module-breakdown)
   - [Authentication and Authorization](#authentication-and-authorization)
   - [User Profile Management](#user-profile-management)
   - [Appointment Management](#appointment-management)
   - [Invoice and Payment Processing](#invoice-and-payment-processing)
   - [Admin Panel](#admin-panel)
8. [Workflows](#workflows)
   - [User Registration and Authentication Flow](#user-registration-and-authentication-flow)
   - [Appointment Scheduling Flow](#appointment-scheduling-flow)
   - [Insurance Upload and OCR Flow](#insurance-upload-and-ocr-flow)
9. [Security Considerations](#security-considerations)
10. [Future Enhancements](#future-enhancements)

---

## Introduction

The **Practice Management MVP** is designed to simplify and automate routine administrative tasks in dental clinics. By integrating appointment scheduling, invoice generation, insurance verification, and patient management into a unified platform, the application aims to improve operational efficiency and enhance patient experience.

---

## Project Structure

```bash
practice-management-mvp/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js          # Handles user authentication and authorization logic
│   │   │   ├── userController.js          # Manages user-related operations (profile, insurance info, etc.)
│   │   │   ├── appointmentController.js   # Handles appointment scheduling and management
│   │   │   ├── invoiceController.js       # Manages invoice generation and payment processing
│   │   ├── models/
│   │   │   ├── userModel.js               # Defines the schema for User documents in MongoDB
│   │   │   ├── insuranceModel.js          # Defines the schema for Insurance documents in MongoDB
│   │   │   ├── appointmentModel.js        # Defines the schema for Appointment documents in MongoDB
│   │   │   ├── invoiceModel.js            # Defines the schema for Invoice documents in MongoDB
│   │   ├── services/
│   │   │   ├── ocrService.js              # Integrates with Google Cloud Vision API for OCR
│   │   │   ├── paymentService.js          # Integrates with Stripe API for payment processing
│   │   │   ├── insuranceService.js        # Handles insurance verification via API
│   │   ├── routes/
│   │   │   ├── authRoutes.js              # Routes related to user authentication
│   │   │   ├── userRoutes.js              # Routes related to user operations (profile, insurance)
│   │   │   ├── appointmentRoutes.js       # Routes for appointment-related operations
│   │   │   ├── invoiceRoutes.js           # Routes for invoice and payment-related operations
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js          # JWT authentication middleware
│   │   │   ├── errorMiddleware.js         # Centralized error handling middleware
│   │   ├── config/
│   │   │   ├── dbConfig.js                # Database connection configuration (MongoDB)
│   │   │   ├── cloudConfig.js             # Configuration for Google Cloud Vision API
│   │   │   ├── stripeConfig.js            # Configuration for Stripe API
│   │   ├── app.js                         # Initializes Express server and loads middleware
│   │   ├── server.js                      # Starts the server and listens for requests
│   ├── test/
│   │   ├── unit/
│   │   │   ├── authController.test.js     # Unit tests for auth controller
│   │   │   ├── appointmentController.test.js # Unit tests for appointment controller
│   │   ├── integration/
│   │   │   ├── ocrService.test.js         # Integration tests for OCR service
│   │   │   ├── paymentService.test.js     # Integration tests for payment service
│   ├── package.json                       # Dependencies and scripts for backend
│   ├── README.md                          # Backend-specific documentation
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Login.js                   # Login component for user authentication
│   │   │   ├── Register.js                # Registration component for new users
│   │   │   ├── Dashboard.js               # User dashboard showing appointments and invoices
│   │   │   ├── UploadInsurance.js         # Insurance upload form with OCR functionality
│   │   │   ├── AppointmentList.js         # Displays a list of upcoming and past appointments
│   │   │   ├── InvoiceList.js             # Displays outstanding and paid invoices
│   │   ├── pages/
│   │   │   ├── HomePage.js                # Homepage with navigation to login/register
│   │   │   ├── AdminDashboard.js          # Admin panel overview (appointments, invoices, etc.)
│   │   ├── services/
│   │   │   ├── authService.js             # API calls related to authentication (login, registration)
│   │   │   ├── appointmentService.js      # API calls related to appointments
│   │   │   ├── invoiceService.js          # API calls related to invoice management
│   │   │   ├── insuranceService.js        # API calls related to insurance upload and OCR
│   │   ├── state/
│   │   │   ├── authContext.js             # Context for managing authentication state
│   │   │   ├── appointmentContext.js      # Context for managing appointment data
│   │   │   ├── invoiceContext.js          # Context for managing invoice data
│   │   │   ├── userContext.js             # Context for managing user profile data
│   │   │   ├── insuranceContext.js        # Context for managing insurance data
│   │   ├── App.js                         # Main React component
│   ├── public/
│   │   ├── index.html                     # Main HTML file for React app
│   ├── package.json                       # Dependencies and scripts for frontend
│   ├── README.md                          # Frontend-specific documentation
├── docs/
│   ├── API.md                             # API documentation for backend services
│   ├── UI_Mockups/
│   │   ├── patient_portal_mockup.png      # Mockups for the patient portal
│   │   ├── admin_panel_mockup.png         # Mockups for the admin panel
├── README.md                              # Root-level documentation describing the project
├── .gitignore                             # Files and directories to ignore in version control
└── docker-compose.yml                     # Docker configuration for development environment
```

### Breakdown of Files and Directories

- **`backend/`**: Contains all server-side logic, including routes, controllers, models, and services. It manages API endpoints, database interactions, and third-party integrations (OCR, payment processing, insurance verification).

  - **`controllers/`**: Handle HTTP requests and orchestrate operations for user management, appointments, invoices, and more.
  - **`models/`**: Define MongoDB schemas for entities like users, appointments, invoices, and insurance.
  - **`services/`**: Implement core business logic and integrate with third-party APIs (e.g., Google Cloud Vision, Stripe).
  - **`routes/`**: Define RESTful API endpoints and map them to controller methods.
  - **`middleware/`**: Implement middleware for authentication, error handling, and request validation.
  - **`config/`**: Store configuration settings and environment variables for services like MongoDB, Stripe, and Google Cloud APIs.
  - **`test/`**: Contains unit and integration tests to ensure code reliability and correctness.

- **`frontend/`**: Contains the client-side React application for both patients and administrators. It manages UI components, state, and API communication.

  - **`components/`**: Reusable React components like forms, tables, dashboards, and modals.
  - **`pages/`**: Page components representing different routes (e.g., homepage, login, admin dashboard).
  - **`services/`**: Handle API communication between the frontend and backend.
  - **`state/`**: Manage application state using Context API for authentication, user profiles, appointments, invoices, etc.
  - **`App.js`**: Main application component that sets up routing and context providers.

- **`docs/`**: Contains documentation for the project, including API specifications and UI mockups for reference.

- **`docker-compose.yml`**: Defines Docker services for setting up a consistent development and testing environment.

---

## System Architecture

### High-Level Overview

The application follows a client-server architecture with a clear separation between the frontend and backend. The backend exposes RESTful APIs consumed by the frontend. The system is designed for scalability and ease of maintenance.

```mermaid
flowchart LR
    ClientBrowser --> |HTTP Requests| BackendServer
    BackendServer --> |Database Queries| MongoDB[(MongoDB)]
    BackendServer --> |API Calls| ThirdPartyAPIs[Third-Party Services]
    ThirdPartyAPIs --> BackendServer
```

### Backend Architecture

The backend is built with Node.js and Express.js, following a modular structure.

```mermaid
flowchart TB
    subgraph Backend[Backend Node.js/Express.js]
        Controllers --> Models
        Controllers --> Services
        Controllers -->|Use| Middleware
        Routes --> Controllers
        Middleware --> Config
    end
    Backend --> |Database Connection| MongoDB[(MongoDB)]
    Backend --> |Integrations| ThirdPartyAPIs[Third-Party Services]
```

- **Controllers**: Process incoming requests, call appropriate services, and return responses.
- **Models**: Define data schemas and interact with the MongoDB database via Mongoose.
- **Services**: Contain business logic and handle operations like payment processing and OCR.
- **Middleware**: Include authentication middleware (JWT), error handling, and input validation.
- **Routes**: Define API endpoints and map them to controller functions.
- **Config**: Store configuration and environment variables for secure and flexible setup.

### Frontend Architecture

The frontend is developed using React.js, utilizing functional components and hooks.

```mermaid
flowchart TB
    subgraph Frontend[Frontend (React.js)]
        Components --> Pages
        Pages --> AppComponent[App.js]
        AppComponent --> Routing
        AppComponent --> StateManagement
        Services --> |API Calls| BackendAPIs[(Backend APIs)]
        StateManagement --> Components
        StateManagement --> Pages
    end
```

- **Components**: Reusable UI elements used across different pages.
- **Pages**: Specific views representing different routes.
- **Services**: Handle communication with the backend APIs using Axios.
- **State Management**: Use Context API for managing global state (e.g., authenticated user).
- **Routing**: Implemented using React Router for client-side navigation.

---

## Technology Stack

### Frontend Technologies

- **Language**: JavaScript (ES6+)
- **Framework**: React.js
- **State Management**: Context API
- **UI Libraries**: Material-UI for consistent and responsive UI components
- **Routing**: React Router for client-side routing
- **Form Handling**: Formik and Yup for form management and validation
- **HTTP Client**: Axios for API calls
- **Build Tool**: Create React App (CRA)
- **Testing**: Jest and React Testing Library

### Backend Technologies

- **Language**: JavaScript (ES6+)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT) with Passport.js
- **API Documentation**: Swagger or OpenAPI Specification
- **Environment Management**: dotenv for environment variables
- **Testing**: Mocha, Chai, and Sinon
- **Logging**: Morgan for HTTP request logging

### Third-Party Integrations

- **OCR Service**: Google Cloud Vision API for extracting text from insurance documents
- **Payment Gateway**: Stripe API for handling secure payments
- **Cloud Services**: AWS for potential deployment, storage, and scalability
- **Email/SMS Notifications**: (Optional) Integration with services like Twilio or SendGrid

---

## Database Design

### Data Models

#### User Model (`userModel.js`)

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
  roles: [String],
  address: String,
  phoneNumber: String,
  insurance: ObjectId, // Reference to Insurance Model
}
```

#### Insurance Model (`insuranceModel.js`)

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to User Model
  providerName: String,
  policyNumber: String,
  scannedDocuments: [String], // URLs or file paths
  verificationStatus: String, // e.g., 'pending', 'verified'
}
```

#### Appointment Model (`appointmentModel.js`)

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to User Model
  appointmentDate: Date,
  status: String, // e.g., 'requested', 'confirmed', 'completed'
  notes: String,
}
```

#### Invoice Model (`invoiceModel.js`)

```javascript
{
  _id: ObjectId,
  userId: ObjectId, // Reference to User Model
  appointmentId: ObjectId, // Reference to Appointment Model
  amountDue: Number,
  amountPaid: Number,
  dueDate: Date,
  status: String, // e.g., 'unpaid', 'paid', 'overdue'
}
```

### Entity-Relationship Diagram

```mermaid
erDiagram
    USER ||--o{ APPOINTMENT : has
    USER ||--o{ INVOICE : receives
    USER ||--|| INSURANCE : owns
    APPOINTMENT ||--|| INVOICE : generates

    USER {
        ObjectId _id
        string firstName
        string lastName
        string email
        string passwordHash
        string[] roles
        string address
        string phoneNumber
        ObjectId insuranceId
    }
    INSURANCE {
        ObjectId _id
        ObjectId userId
        string providerName
        string policyNumber
        string[] scannedDocuments
        string verificationStatus
    }
    APPOINTMENT {
        ObjectId _id
        ObjectId userId
        datetime appointmentDate
        string status
        string notes
    }
    INVOICE {
        ObjectId _id
        ObjectId userId
        ObjectId appointmentId
        double amountDue
        double amountPaid
        datetime dueDate
        string status
    }
```

---

## API Endpoints

### Authentication Routes (`/api/auth`)

- **`POST /register`**: Register a new user.
- **`POST /login`**: Authenticate user and return a JWT token.

### User Routes (`/api/user`)

- **`GET /profile`**: Retrieve user profile information.
- **`PUT /profile`**: Update user profile.
- **`POST /insurance`**: Upload insurance documents.
- **`GET /insurance`**: Get insurance details.

### Appointment Routes (`/api/appointments`)

- **`POST /`**: Request a new appointment.
- **`GET /`**: Get user's appointments.
- **`PUT /:id/cancel`**: Cancel an appointment.
- **`PUT /:id/check-in`**: Check-in to an appointment.
- **`PUT /:id/check-out`**: Check-out of an appointment.

### Invoice Routes (`/api/invoices`)

- **`GET /`**: Retrieve user's invoices.
- **`POST /pay`**: Pay an invoice.

### Admin Routes (`/api/admin`)

- **`GET /users`**: Retrieve all users (admin only).
- **`PUT /users/:id/role`**: Update user role.
- **`GET /appointments`**: Retrieve all appointments.
- **`GET /invoices`**: Retrieve all invoices.
- **`GET /reports/appointments`**: Generate appointment reports.

---

## Module Breakdown

### Authentication and Authorization

Implementing secure user authentication and authorization mechanisms using JWTs and Passport.js.

- **JWT Authentication**: Secure stateless authentication mechanism for API protection.
- **Role-Based Access Control (RBAC)**: Users are assigned roles (`patient`, `admin`) that grant specific permissions.

### User Profile Management

Allows users to manage their personal information and insurance details.

- **Profile Updates**: Users can update their address, phone number, and other personal details.
- **Insurance Management**: Users can upload insurance cards, which are processed via OCR to extract information.

### Appointment Management

Enables users to schedule, view, and manage their appointments.

- **Appointment Requests**: Users can request appointments for available slots.
- **Status Tracking**: Appointment statuses include `requested`, `confirmed`, `canceled`, `completed`.
- **Check-In/Check-Out**: Users can check in upon arrival and check out after their appointment.

### Invoice and Payment Processing

Handles billing and payment transactions securely and efficiently.

- **Invoice Generation**: Automatically generate invoices upon appointment completion.
- **Payment Processing**: Integrate with Stripe API to process payments securely.
- **Payment Status**: Manage the status of invoices (`unpaid`, `paid`, `overdue`).

### Admin Panel

Provides administrators with tools to manage the practice effectively.

- **Dashboard**: Overview of key metrics like upcoming appointments, revenue, and patient statistics.
- **Patient Management**: View and manage patient profiles and insurance verification.
- **Appointment Management**: Oversee all appointments, confirm requests, and make adjustments.
- **Invoice Management**: Monitor invoices, payments, and financial reports.
- **Reporting**: Generate detailed reports on various aspects of the practice.

---

## Workflows

### User Registration and Authentication Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    User->>Frontend: Fills registration form
    Frontend->>Backend: POST /api/auth/register
    Backend->>Database: Save user data
    Database-->>Backend: Confirmation
    Backend-->>Frontend: Registration success
    User->>Frontend: Enters login credentials
    Frontend->>Backend: POST /api/auth/login
    Backend->>Database: Verify credentials
    Database-->>Backend: User data
    Backend-->>Frontend: JWT token
    Frontend-->>User: Access granted
```

### Appointment Scheduling Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    User->>Frontend: Request new appointment
    Frontend->>Backend: POST /api/appointments
    Backend->>Database: Save appointment request
    Database-->>Backend: Appointment details
    Backend-->>Frontend: Confirmation
    Frontend-->>User: Appointment requested
    Admin->>Backend: Confirms appointment
    Backend->>Database: Update status to 'confirmed'
    Backend-->>Admin: Confirmation sent
    Backend-->>Frontend: Notifies user
```

### Insurance Upload and OCR Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Backend
    participant OCRService
    User->>Frontend: Uploads insurance card
    Frontend->>Backend: POST /api/user/insurance
    Backend->>OCRService: Process image
    OCRService-->>Backend: Extracted data
    Backend->>Database: Save insurance data
    Backend-->>Frontend: Insurance details
    Frontend-->>User: Displays extracted info
```

---

## Security Considerations

- **Data Encryption**: All data transmitted between the client and server is encrypted using SSL/TLS.
- **Password Security**: Passwords are hashed using bcrypt before storage.
- **Input Validation**: All incoming data is validated and sanitized to prevent SQL injection and XSS attacks.
- **Access Control**: Middleware enforces authentication and authorization based on user roles.
- **Compliance**: The application is designed with HIPAA compliance in mind to protect patient health information.

---

## Future Enhancements

- **Mobile Applications**: Develop native iOS and Android apps for better accessibility.
- **Microservices Architecture**: Refactor the backend into microservices for scalability.
- **Telehealth Features**: Integrate video conferencing for remote consultations.
- **AI Recommendations**: Use machine learning to provide insights and predictive analytics.
- **Multilingual Support**: Offer the application in multiple languages for broader reach.
- **Integration with EHR Systems**: Sync data with Electronic Health Records for comprehensive patient care.

---

*This README provides a detailed technical overview of the Practice Management MVP, outlining its architecture, components, and workflows to facilitate understanding and collaboration among developers and stakeholders.*