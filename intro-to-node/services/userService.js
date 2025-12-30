// services/userService.js
// This file contains the business logic for user operations
// It interacts with the in-memory data store

const { users, getNextId } = require('../models/user');

// Get all users
function getAllUsers() {
  return users;
}

// Get a user by ID
function getUserById(id) {
  return users.find(user => user.id === parseInt(id));
}

// Create a new user
function createUser(userData) {
  const newUser = {
    id: getNextId(),
    name: userData.name,
    email: userData.email,
    status: userData.status || 'active',
    role: userData.role || 'user'
  };
  users.push(newUser);
  return newUser;
}

// Update an existing user
function updateUser(id, userData) {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) return null;

  const updatedUser = { ...users[userIndex], ...userData };
  users[userIndex] = updatedUser;
  return updatedUser;
}

// Delete a user
function deleteUser(id) {
  const userIndex = users.findIndex(user => user.id === parseInt(id));
  if (userIndex === -1) return null;

  const deletedUser = users.splice(userIndex, 1)[0];
  return deletedUser;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};