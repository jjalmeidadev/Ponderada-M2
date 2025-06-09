const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userService = require('../services/userService');

router.use(async (req, res, next) => {
  if (req.session && req.session.userId) {
    try {
      const user = await userService.getUserById(req.session.userId);
      req.user = user || null;
    } catch (err) {
      req.user = null;
    }
  } else {
    req.user = null;
  }
  next();
});

router.get('/', (req, res) => {
  res.redirect('/login'); // Redireciona para login por padrão
});

router.get('/login', (req, res) => {
  res.render('pages/login', { error: null }); // Renderiza a página de login
});

router.get('/dashboard', (req, res, next) => {
  if (!req.session.userId || !req.user) {
    return res.redirect('/login');
  }
  next();
}, userController.dashboard);

router.get('/profile', (req, res) => {
  if (!req.session.subscribedEvents) {
    req.session.subscribedEvents = [];
  }
  console.log("Enviando para profile:", req.session.subscribedEvents);
  res.render('pages/profile', { 
    subscribedEvents: req.session.subscribedEvents,
    user: req.user || null 
  });
});

router.get('/sobre', (req, res) => {
  res.render('pages/sobre', { user: req.user });
});

// Rota para inscrição de eventos
router.post('/subscribe', (req, res) => {
  if (!req.session.subscribedEvents) {
    req.session.subscribedEvents = [];
  }
  console.log("Received event:", req.body.event);
  req.session.subscribedEvents.push(req.body.event);
  console.log("Sessão atualizada:", req.session.subscribedEvents);
  res.json({ success: true });
});

module.exports = router;
