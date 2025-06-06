// services/userService.js

const User = require('../models/userModel');

const userService = {
  async authenticate(email, password) {
    const user = await User.findByEmail(email);
    if (!user) return null;
    // Simple password check (plaintext, for demo only)
    if (user.password === password) return user;
    return null;
  },
  async getUserById(id) {
    return await User.findById(id);
  }
};

module.exports = userService;
