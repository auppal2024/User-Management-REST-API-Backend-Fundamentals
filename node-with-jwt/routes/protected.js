// routes/protected.js
const express = require('express');
const router = express.Router();
const { authenticateToken, requireRole } = require('../middleware/auth');

// Public routes (no authentication required)
// - Signup and login are in auth routes
router.get('/public', (req, res) => {
  res.json({ message: 'This is a public route' });
});

// Protected routes (require authentication)
router.get('/users', authenticateToken, (req, res) => {
  res.json({ message: `Welcome, ${req.user.name}! You are a ${req.user.role}.`, user: req.user });
});

// Admin-only routes (require admin role)
router.get('/admin/users', authenticateToken, requireRole('admin'), (req, res) => {
  res.json({ message: 'Admin data: list of users', users: [] }); // Simulated
});

router.delete('/admin/users/:email', authenticateToken, requireRole('admin'), (req, res) => {
  // In a real app, implement deletion logic
  res.json({ message: `User ${req.params.email} deleted (simulated)` });
});

module.exports = router;