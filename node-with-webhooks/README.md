# User Management REST API with Webhooks

A simple **User Management Backend API** built using **Node.js, Express, and in-memory storage**, designed to demonstrate **backend fundamentals, webhook integration, and REST API conventions**.

This project focuses on **how backend systems handle user data and trigger events via webhooks**, building upon basic API structure with event-driven functionality.

---

## 🚀 What This Project Does

This backend system allows you to:

- Create new users and store them in memory
- View all users or a specific user
- Update user information
- Delete users
- Trigger webhooks on user creation

It demonstrates **real-world backend architecture** with logging, error handling, and webhook notifications.

---

## 🧠 Why This Project Exists

The goal of this project is to understand **backend fundamentals with webhook integration**, including:

- In-memory data storage and management
- REST API design and HTTP methods
- Webhook triggering for event-driven systems
- Logging with Winston
- Environment variable management
- Clean folder and file organization for scalable apps

This builds on basic API concepts by adding **webhook notifications**, showing how applications can notify external systems of events.

---

## 🗂️ Project Structure

```
src/
├── server.js                    # Main application entry point
├── routes/
│   └── users.js                 # User API routes with webhook integration
├── logger.js                    # Winston logger configuration
├── utils/
│   └── webhook.js               # Webhook triggering utility
└── middleware/
    └── errorHandler.js          # Error handling middleware
```

### Folder Responsibilities

- **routes** – Defines API endpoints and HTTP methods
- **utils** – Utility functions like webhook triggering
- **middleware** – Cross-cutting concerns like error handling
- **logger.js** – Centralized logging configuration

---

## 👤 User Data Model

The users are stored in memory with the following fields:

- `id` – Auto-incrementing unique identifier (integer)
- `name` – User's full name (string)
- `email` – Email address (string)
- `createdAt` – Timestamp of user creation (Date)
- `updatedAt` – Timestamp of last update (Date)

---

## 🔄 Request Flow Explained

Example: Creating a new user with webhook

```
Client
  → Route (/users) POST
    → In-memory store (add user)
  ← Response (JSON)
→ Webhook (if configured)
```

This layered approach separates concerns and makes the system **maintainable**.

---

## 🌐 REST API Endpoints

### Users

| Method | Endpoint      | Description             |
|--------|---------------|-------------------------|
| GET    | /users        | Get all users           |
| GET    | /users/:id    | Get user by ID          |
| POST   | /users        | Create a new user       |
| PUT    | /users/:id    | Update an existing user |
| DELETE | /users/:id    | Delete a user           |

---

## 📥 Example Requests & Responses

### Create User

```
POST /users
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
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2026-01-03T23:00:00.000Z"
}
```

**Webhook Payload (if WEBHOOK_URL set)**
```json
{
  "event": "USER_CREATED",
  "userId": 1,
  "email": "john@example.com",
  "timestamp": "2026-01-03T23:00:00.000Z"
}
```

---

### Get All Users

```
GET /users
```

**Response**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-01-03T23:00:00.000Z"
  }
]
```

---

### Get User by ID

```
GET /users/1
```

**Response**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "createdAt": "2026-01-03T23:00:00.000Z"
}
```

---

### Update User

```
PUT /users/1
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
  "id": 1,
  "name": "John Smith",
  "email": "johnsmith@example.com",
  "createdAt": "2026-01-03T23:00:00.000Z",
  "updatedAt": "2026-01-03T23:05:00.000Z"
}
```

---

### Delete User

```
DELETE /users/1
```

**Response**
204 No Content

---

## ⚠️ Error Handling

The API handles common errors:

- **400** – Bad Request (missing name or email)
- **404** – User not found

All errors are returned as JSON with a clear message.

---

## 🛠️ Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework for Node.js
- **Winston** – Logging library
- **Axios** – HTTP client for webhooks
- **Dotenv** – Environment variable management

---

## ▶️ How to Run the Project

### Prerequisites

- Node.js (v14 or higher)

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Set Up Environment Variables (Optional)

Create a `.env` file in the root directory for webhook URL:

```env
WEBHOOK_URL=https://your-webhook-endpoint.com/hook
```

### 3️⃣ Start the Server

```bash
npm start
```

### 4️⃣ Access the API

```
http://localhost:3120/
```

Use Postman, curl, or any API client to test endpoints.

---

## 📌 Key Learnings

- How to build REST APIs with Express
- In-memory data storage for learning
- Implementing webhooks for event notifications
- Logging with Winston
- Environment variable configuration
- Error handling in APIs
- Separation of concerns in backend architecture

---

## 🔮 Future Improvements

- Add persistent database storage (PostgreSQL, MongoDB)
- Implement authentication and authorization
- Add input validation middleware
- Include unit and integration tests
- Add rate limiting and security middleware
- Implement pagination for large datasets
- Add more webhook events (update, delete)

---

## 📝 Notes

This project demonstrates the basics of **REST APIs with webhook integration**, showing how applications can notify external systems of events. It's part of a **progressive backend learning journey** that builds complexity incrementally while maintaining clean, readable code.