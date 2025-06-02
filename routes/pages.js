const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('pages/login', { title: 'InOrder - Login' });
});

router.get('/sobre', (req, res) => {
    res.render('pages/sobre', { title: 'InOrder - Sobre' });
});

router.get('/dashboard', (req, res) => {
    res.render('pages/dashboard', { title: 'InOrder - Dashboard' });
});

router.get('/profile', (req, res) => {
    res.render('pages/profile', { title: 'InOrder - Perfil', page: 'profile' });
});

module.exports = router;
