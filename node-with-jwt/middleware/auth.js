// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // In production, use env variable

// Token handling: Expect token in Authorization header as "Bearer <token>"
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' }); // Missing token: 401
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' }); // Invalid token: 401
    }
    req.user = user;
    next();
  });
};

// Role-based access control
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: `Access denied. ${role} role required.` }); // Forbidden role: 403
    }
    next();
  };
};

module.exports = { authenticateToken, requireRole, JWT_SECRET };