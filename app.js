const express = require('express');
const app = express();
const pagesRouter = require('./routes/pages');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

app.use('/', pagesRouter);

module.exports = app;