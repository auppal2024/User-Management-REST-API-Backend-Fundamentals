// models/user.js
// This file defines the user data structure and provides an in-memory store
// Since we're not using a database yet, we'll store users in an array in memory

let users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'user'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'inactive',
    role: 'admin'
  }
];

let nextId = 3; // For auto-generating IDs

module.exports = {
  users,
  getNextId: () => nextId++
};