// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../middleware/auth');

const register = (req, res) => {
  const { name, email, password, role = 'user' } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required' });
  }

  if (User.findByEmail(email)) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const user = new User(name, email, password, role);
  User.save(user);

  res.status(201).json({ message: 'User registered successfully' });
};

const login = (req, res) => {
  const { email, password } = req.body;

  const user = User.findByEmail(email);
  if (!user || !user.checkPassword(password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const accessToken = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '15m' } // Short-lived access token
  );

  const refreshToken = jwt.sign(
    { id: user.id },
    JWT_SECRET,
    { expiresIn: '7d' } // Long-lived refresh token
  );

  User.storeRefreshToken(user.id, refreshToken);

  res.json({ accessToken, refreshToken, expiresIn: '15m' });
};

const refresh = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    const storedToken = User.getRefreshToken(decoded.id);

    if (storedToken !== refreshToken) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    const user = User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const newAccessToken = jwt.sign(
      { id: user.id, name: user.name, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '15m' }
    );

    res.json({ accessToken: newAccessToken, expiresIn: '15m' });
  } catch (err) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
};

const logout = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token required' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_SECRET);
    User.invalidateRefreshToken(decoded.id);
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid refresh token' });
  }
};

module.exports = { register, login, refresh, logout };