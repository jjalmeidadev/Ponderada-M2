const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configura a sessão (armazenamento de dados de eventos)
app.use(session({
  secret: '123', 
  resave: false,
  saveUninitialized: false
}));

const pagesRouter = require('./routes/pages');
const userRoutes = require('./routes/userRoutes');
const apiSubscribeRoutes = require('./routes/api/subscribe');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));

app.use('/', pagesRouter);
app.use('/', userRoutes);
app.use('/api/subscribe', apiSubscribeRoutes);

module.exports = app;