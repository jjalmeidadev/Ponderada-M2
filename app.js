const express = require('express');
const path = require('path');
const app = express();
const pagesRouter = require('./routes/pages');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/styles', express.static(path.join(__dirname, 'public/styles')));

app.use('/', pagesRouter);

module.exports = app;