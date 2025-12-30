// routes/users.js
// This file defines the API routes for user management
// It maps HTTP methods and paths to controller functions

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// GET /users - Get all users
router.get('/', userController.getAllUsers);

// GET /users/:id - Get a single user by ID
router.get('/:id', userController.getUserById);

// POST /users - Create a new user
router.post('/', userController.createUser);

// PUT /users/:id - Update an existing user
router.put('/:id', userController.updateUser);

// DELETE /users/:id - Delete a user
router.delete('/:id', userController.deleteUser);

module.exports = router;