// server.js
const app = require('./app');

const PORT = process.env.PORT || 3000;

const pagesRouter = require('./routes/pages');
const userRouter = require('./routes/user');

app.use('/', pagesRouter);
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});