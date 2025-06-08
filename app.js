const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuração de sessão
app.use(session({
  secret: '123', // Chave para sessão
  resave: false,
  saveUninitialized: false
}));

// Rotas principais
const pagesRouter = require('./routes/pages');
const userRoutes = require('./routes/userRoutes');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));

app.use('/', pagesRouter);
app.use('/', userRoutes);

module.exports = app;