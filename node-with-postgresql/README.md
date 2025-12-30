# User Management REST API with PostgreSQL

A simple **User Management Backend API** built using **Node.js, Express, and PostgreSQL**, designed to demonstrate **backend fundamentals, database integration, and REST API conventions**.

This project focuses on **how backend systems interact with databases and how requests flow from client to database**, building upon basic API structure with real data persistence.

---

## 🚀 What This Project Does

This backend system allows you to:

- Create new users and store them in a PostgreSQL database
- View all users or a specific user from the database
- Update user information in the database
- Delete users from the database

It demonstrates **real-world backend architecture** with database operations, making it ideal for learning full-stack backend development.

---

## 🧠 Why This Project Exists

The goal of this project is to understand **backend fundamentals with database integration**, including:

- Database connection and query execution
- SQL operations (CRUD)
- Environment variable management
- Proper error handling with database operations
- Clean folder and file organization for scalable apps

This builds on basic API concepts by adding **persistent storage**, showing how real applications handle data.

---

## 🗂️ Project Structure

```
src/
├── index.js                    # Main application entry point
├── config/
│   └── db.js                   # Database connection configuration
├── controllers/
│   └── userController.js       # Request handlers and response formatting
├── models/
│   └── userModel.js            # Database queries and business logic
├── routes/
│   └── userRoutes.js           # API route definitions
├── middlewares/
│   └── errorHandler.js         # Global error handling middleware
└── data/
    └── createUserTable.js      # Database table initialization
```

### Folder Responsibilities

- **config** – Database connection setup and configuration
- **controllers** – Handles HTTP requests and formats responses
- **models** – Contains database queries and business logic
- **routes** – Defines API endpoints and HTTP methods
- **middlewares** – Cross-cutting concerns like error handling
- **data** – Database initialization scripts

---

## 👤 User Data Model

The users table contains the following fields:

- `id` – Auto-incrementing primary key (integer)
- `name` – User's full name (varchar, 100 chars)
- `email` – Unique email address (varchar, 100 chars, unique constraint)
- `created_at` – Timestamp of user creation (defaults to current timestamp)

---

## 🔄 Request Flow Explained

Example: Creating a new user

```
Client
  → Route (/api/users) POST
    → Controller (createUser)
      → Model (createUserService)
        → Database (INSERT query)
      ←
    ← Response (JSON)
  ←
```

This layered approach separates concerns and makes the system **maintainable and testable**.

---

## 🌐 REST API Endpoints

### Root
```
GET /
```
Returns API information and database connection status.

---

### Users

| Method | Endpoint        | Description             |
|-------|-----------------|-------------------------|
| GET   | /api/users      | Get all users           |
| GET   | /api/users/:id  | Get user by ID          |
| POST  | /api/users      | Create a new user       |
| PUT   | /api/users/:id  | Update an existing user |
| DELETE| /api/users/:id  | Delete a user           |

---

## 📥 Example Requests & Responses

### Create User
```
POST /api/users
Content-Type: application/json
```

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response**
```json
{
  "status": 201,
  "message": "User created successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-12-30T10:30:00.000Z"
  }
}
```

---

### Get All Users
```
GET /api/users
```

**Response**
```json
{
  "status": 200,
  "message": "Users retrieved successfully",
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "created_at": "2025-12-30T10:30:00.000Z"
    }
  ]
}
```

---

### Get User by ID
```
GET /api/users/1
```

**Response**
```json
{
  "status": 200,
  "message": "User retrieved successfully",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2025-12-30T10:30:00.000Z"
  }
}
```

---

### Update User
```
PUT /api/users/1
Content-Type: application/json
```

**Request Body**
```json
{
  "name": "John Smith",
  "email": "johnsmith@example.com"
}
```

**Response**
```json
{
  "status": 200,
  "message": "User updated successfully",
  "data": {
    "id": 1,
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "created_at": "2025-12-30T10:30:00.000Z"
  }
}
```

---

### Delete User
```
DELETE /api/users/1
```

**Response**
```json
{
  "status": 200,
  "message": "User deleted successfully",
  "data": {
    "id": 1,
    "name": "John Smith",
    "email": "johnsmith@example.com",
    "created_at": "2025-12-30T10:30:00.000Z"
  }
}
```

---

## ⚠️ Error Handling

The API handles common errors gracefully:

- **400** – Bad Request (missing required fields)
- **404** – User not found
- **409** – Duplicate email (PostgreSQL unique constraint)
- **500** – Internal server error (database connection issues, etc.)

All errors are returned as JSON with a clear message.

---

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for Node.js
- **PostgreSQL** – Relational database
- **pg** – PostgreSQL client for Node.js
- **dotenv** – Environment variable management
- **cors** – Cross-origin resource sharing
- **nodemon** – Development auto-restart

---

## ▶️ How to Run the Project

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL database

### 1️⃣ Clone and Install Dependencies
```bash
npm install
```

### 2️⃣ Set Up Environment Variables
Create a `.env` file in the root directory:
```env
DB_USER=your_db_username
DB_HOST=localhost
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
DB_PORT=5432
PORT=3010
```

### 3️⃣ Set Up Database
- Create a PostgreSQL database
- The application will automatically create the `users` table on startup

### 4️⃣ Start the Server
```bash
npm run dev
```

### 5️⃣ Access the API
```
http://localhost:3010/
```

Use Postman, curl, or any API client to test endpoints.

---

## 📌 Key Learnings

- How to connect Node.js applications to PostgreSQL
- Writing SQL queries with parameterized statements
- Environment variable configuration for sensitive data
- Proper error handling in database operations
- RESTful API design with database persistence
- Separation of concerns in backend architecture

---

## 🔮 Future Improvements

- Add input validation middleware (e.g., Joi)
- Implement authentication and authorization
- Add pagination for large datasets
- Include unit and integration tests
- Add logging and monitoring
- Implement database migrations
- Add rate limiting and security middleware

---

## 📝 Notes

This project demonstrates the transition from **in-memory storage to persistent database storage**, showing how real applications handle data. It's part of a **progressive backend learning journey** that builds complexity incrementally while maintaining clean, readable code.
