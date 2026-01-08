const express = require('express');
const router = express.Router();
const logger = require('../logger');
const { triggerWebhook } = require('../utils/webhook');

// In-memory users store (for learning purposes)
let users = [];
let nextId = 1;

// GET /users - Get all users
router.get('/', (req, res) => {
  logger.info('Fetching all users', { count: users.length });
  res.json(users);
});

// GET /users/:id - Get user by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) {
    logger.warn('User not found', { id });
    return res.status(404).json({ error: 'User not found' });
  }
  logger.info('Fetched user', { id });
  res.json(user);
});

// POST /users - Create new user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    logger.warn('Invalid user data', { name, email });
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const newUser = { id: nextId++, name, email, createdAt: new Date() };
  users.push(newUser);

  logger.info('User created', { id: newUser.id, name, email });

  // Trigger webhook on user creation
  const webhookUrl = process.env.WEBHOOK_URL;
  if (webhookUrl) {
    const payload = {
      event: 'USER_CREATED',
      userId: newUser.id,
      email: newUser.email,
      timestamp: new Date().toISOString(),
    };
    triggerWebhook(webhookUrl, payload);
  }

  res.status(201).json(newUser);
});

// PUT /users/:id - Update user
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    logger.warn('User not found for update', { id });
    return res.status(404).json({ error: 'User not found' });
  }

  users[userIndex] = { ...users[userIndex], name, email, updatedAt: new Date() };
  logger.info('User updated', { id, name, email });
  res.json(users[userIndex]);
});

// DELETE /users/:id - Delete user
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);

  if (userIndex === -1) {
    logger.warn('User not found for deletion', { id });
    return res.status(404).json({ error: 'User not found' });
  }

  const deletedUser = users.splice(userIndex, 1)[0];
  logger.info('User deleted', { id, name: deletedUser.name });
  res.status(204).send();
});

module.exports = router;