// controllers/userController.js
// This file handles HTTP requests and responses for user-related operations
// It uses the userService for business logic and sends JSON responses

const userService = require('../services/userService');

// Get all users
function getAllUsers(req, res) {
  try {
    const users = userService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve users', error: error.message });
  }
}

// Get a single user by ID
function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to retrieve user', error: error.message });
  }
}

// Create a new user
function createUser(req, res) {
  try {
    const { name, email, status, role } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    // Check if email already exists
    const existingUser = userService.getAllUsers().find(user => user.email === email);
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    const newUser = userService.createUser({ name, email, status, role });
    res.status(201).json({ success: true, data: newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to create user', error: error.message });
  }
}

// Update an existing user
function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedUser = userService.updateUser(id, updateData);

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to update user', error: error.message });
  }
}

// Delete a user
function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = userService.deleteUser(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete user', error: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};