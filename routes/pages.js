const express = require('express');
const router = express.Router();

// Home or redirect to login
router.get('/', (req, res) => {
  res.redirect('/login');
});

// Login page
router.get('/login', (req, res) => {
  res.render('pages/login');
});

// Dashboard page
router.get('/dashboard', (req, res) => {
  res.render('pages/dashboard');
});

// Profile page
router.get('/profile', (req, res) => {
  res.render('pages/profile');
});

// Sobre page
router.get('/sobre', (req, res) => {
  res.render('pages/sobre');
});

module.exports = router;
