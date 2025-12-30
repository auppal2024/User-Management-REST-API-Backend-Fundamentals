// server.js
// This is the main entry point for the User Management API
// It sets up the Express application and starts the server

const express = require('express');
const multer = require('multer');
const usersRouter = require('./routes/users');

const app = express();
const PORT = 3210;

// Middleware to parse requests
app.use(express.json());  // Parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // Parse URL-encoded request bodies
app.use(multer().none());  // Parse multipart/form-data request bodies (for simple fields)

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the User Management API!',
    version: '1.0.0',
    endpoints: {
      'GET /users': 'Get all users',
      'GET /users/:id': 'Get a specific user',
      'POST /users': 'Create a new user',
      'PUT /users/:id': 'Update a user',
      'DELETE /users/:id': 'Delete a user'
    }
  });
});

app.use('/users', usersRouter);

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`User Management API is running on http://localhost:${PORT}`);
});