// controllers/userController.js

const userService = require('../services/userService');
const eventService = require('../services/eventService');

// Retorna todos os usuários
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retorna usuário por ID
const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    user ? res.status(200).json(user) : res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cria novo usuário
const createUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = await userService.createUser(name, email);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Atualiza usuário existente
const updateUser = async (req, res) => {
  try {
    const { name, email, document } = req.body;
    const updatedUser = await userService.updateUser(req.params.id, name, email, document);
    updatedUser ? res.status(200).json(updatedUser) : res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Deleta usuário
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    deletedUser ? res.status(200).json(deletedUser) : res.status(404).json({ error: 'Usuário não encontrado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Exibe tela de login
const showLogin = (req, res) => {
  res.render('pages/login', { error: null });
};

// Processa login e cria sessão
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.authenticate(email, password);
  if (user) {
    const fullUser = await userService.getUserById(user.id || user.user_id);
    if (fullUser) {
      req.session.userId = fullUser.id || fullUser.user_id;
      req.session.email = fullUser.email;
      req.session.document = fullUser.document || '';
      return req.session.save(() => res.redirect('/dashboard'));
    }
  }
  res.render('pages/login', { error: 'Informações inválidas' });
};

// Encerra a sessão
const logout = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};

// Renderiza dashboard com eventos
const dashboard = async (req, res) => {
  let events = [];
  try { events = await eventService.getAllEvents(); } catch (err) { events = []; }
  res.render('pages/dashboard', { events: events || [], user: req.user });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, showLogin, login, logout, dashboard };
