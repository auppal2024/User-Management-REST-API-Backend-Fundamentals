# User Management REST API – Backend Fundamentals

A simple **User Management Backend API** built using **Node.js and Express**, designed to demonstrate **backend fundamentals, clean architecture, and REST API conventions**.

This project focuses on **how backend systems are structured and how requests flow**, rather than database complexity or frontend concerns.

---

## 🚀 What This Project Does

This backend system allows you to:

- Create new users
- View all users or a specific user
- Update user information
- Delete users from the system

It is intentionally kept **simple and readable**, making it ideal for learning backend architecture and API flow.

---

## 🧠 Why This Project Exists

The goal of this project is to understand **backend fundamentals**, including:

- Clear separation of concerns
- Request → logic → response flow
- RESTful API design
- Basic validation and error handling
- Clean folder and file organization

Instead of using a database, this project uses **in-memory storage** so the focus stays on **architecture and logic**, not persistence.

---

## 🗂️ Project Structure

```
src/
├── server.js
├── routes/
│   └── users.js
├── controllers/
│   └── userController.js
├── services/
│   └── userService.js
├── models/
│   └── user.js
└── middleware/
```

### Folder Responsibilities

- **routes** – Defines API endpoints and HTTP methods
- **controllers** – Handles requests and sends responses
- **services** – Contains business logic
- **models** – Defines data structure and in-memory storage
- **middleware** – Reserved for cross-cutting logic (currently minimal)

---

## 👤 User Data Model

Each user contains the following fields:

- `id` – Unique identifier
- `name` – User’s full name
- `email` – Unique email address
- `status` – `active` or `inactive`
- `role` – `user` or `admin`

---

## 🔄 Request Flow Explained

Example: Fetching all users

```
Client
  → Route (/users)
    → Controller
      → Service
        → Model (in-memory data)
      ←
    ←
  ← Response (JSON)
```

This layered approach keeps the system **easy to read, maintain, and extend**.

---

## 🌐 REST API Endpoints

### Root
```
GET /
```
Returns API information and available endpoints.

---

### Users

| Method | Endpoint        | Description             |
|-------|-----------------|-------------------------|
| GET   | /users          | Get all users           |
| GET   | /users/:id      | Get user by ID          |
| POST  | /users          | Create a new user       |
| PUT   | /users/:id      | Update an existing user |
| DELETE| /users/:id      | Delete a user           |

---

## 📥 Example Requests & Responses

### Create User
```
POST /users
```

**Request Body**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "status": "active",
  "role": "user"
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": 3,
    "name": "John Doe",
    "email": "john@example.com",
    "status": "active",
    "role": "user"
  }
}
```

---

### Get All Users
```
GET /users
```

**Response**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "status": "active",
      "role": "admin"
    }
  ]
}
```

---

## ⚠️ Error Handling

The API handles common errors gracefully:

- **400** – Missing required fields
- **404** – User not found
- **409** – Duplicate email
- **500** – Internal server error

All errors are returned as JSON with a clear message.

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **JavaScript**
- **JSON**

---

## ▶️ How to Run the Project

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Start the server
```bash
node server.js
```

### 3️⃣ Access the API
```
http://localhost:3210/
```

Use Postman, curl, or any API client to test endpoints.

---

## 📌 Key Learnings

- How backend APIs are structured
- Difference between routes, controllers, and services
- RESTful design principles
- Request lifecycle in Express
- Writing readable, maintainable backend code

---

## 🔮 Future Improvements

- Add PostgreSQL for persistent storage
- Implement authentication & authorization
- Add request validation middleware
- Add logging and monitoring

---

## 📝 Notes

This project is part of a **backend systems learning journey** and is intentionally scoped to focus on **fundamentals over complexity**.
