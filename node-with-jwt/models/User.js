// models/User.js
const bcrypt = require('bcryptjs');

// Password handling: Hashing with bcrypt for security
class User {
  constructor(name, email, password, role = 'user') {
    this.id = Date.now().toString(); // Simple ID for demo
    this.name = name;
    this.email = email;
    this.password = bcrypt.hashSync(password, 10); // Secure hashing of passwords
    this.role = role;
  }

  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  // Refresh token storage (in production, use database)
  static storeRefreshToken(userId, token) {
    refreshTokens[userId] = token;
  }

  static getRefreshToken(userId) {
    return refreshTokens[userId];
  }

  static invalidateRefreshToken(userId) {
    delete refreshTokens[userId];
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  static save(user) {
    users.push(user);
  }

  // Secure password comparison using bcrypt
  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
}

const users = []; // In-memory storage for demo
const refreshTokens = {}; // In-memory refresh token store

module.exports = User;