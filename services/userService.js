// services/userService.js

const User = require('../models/userModel');

const userService = {
  // Autentica o usuário com base no e-mail e senha
  async authenticate(email, password) {
    const user = await User.findByEmail(email);
    if (!user) return null;
    // Verificação simples de senha (apenas para demonstração)
    if (user.password === password) return user;
    return null;
  },
  // Busca o usuário pelo ID
  async getUserById(id) {
    return await User.findById(id);
  }
};

module.exports = userService;
