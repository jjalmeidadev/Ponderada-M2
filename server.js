// server.js
const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server está rodando na porta ${port}`); // Inicia o servidor na porta especificada
});