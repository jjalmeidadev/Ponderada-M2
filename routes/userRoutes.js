// Rotas e ações essenciais para usuários
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userService = require('../services/userService');
const User = require('../models/User');

// CRUD de usuários
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Login, logout e dashboard
router.get('/login', userController.showLogin);
router.post('/login', userController.login);
router.get('/logout', userController.logout);
router.get('/dashboard', userController.dashboard);

// Rotas extras para sessão e perfil
router.post('/subscribe', (req, res) => {
  if (!req.session.subscribedEvents) req.session.subscribedEvents = [];
  req.session.subscribedEvents.push(req.body.event);
  console.log("Sessão atualizada:", req.session.subscribedEvents);
  res.json({ success: true });
});
router.get('/profile', async (req, res) => {
  if (!req.session.subscribedEvents) req.session.subscribedEvents = [];
  console.log("Enviando para profile:", req.session.subscribedEvents);
  res.render('pages/profile', { subscribedEvents: req.session.subscribedEvents, user: req.user || null });
});
router.post('/updateEmail', async (req, res) => {
  try {
    const userId = req.session.userId;
    const newEmail = req.body.email;
    await User.updateEmail(userId, newEmail);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
module.exports = router;