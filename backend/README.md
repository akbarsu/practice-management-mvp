// Backend-specific documentation

# Backend

This directory contains the server-side code for the Practice Management MVP.

## Getting Started

### Prerequisites

- **Node.js** (v14 or higher)
- **NPM**
- **MongoDB**
- **Docker** (optional, for containerization)

### Installation

1. **Clone the repository and navigate to the backend directory:**

   ```bash
   git clone https://github.com/your-repo/practice-management-mvp.git
   cd practice-management-mvp/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file in the `backend/` directory and add the following environment variables:**

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/practice_mgmt
   JWT_SECRET=your_jwt_secret_here
   STRIPE_SECRET_KEY=your_stripe_secret_key_here
   GOOGLE_APPLICATION_CREDENTIALS=/path/to/google-credentials.json
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

### Running Tests

To run the test suite:

```bash
npm test
```