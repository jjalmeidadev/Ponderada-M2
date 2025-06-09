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

router.get('/dashboard', (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/login'); // Redireciona se não estiver logado
  }
  next();
}, userController.dashboard);

module.exports = router;