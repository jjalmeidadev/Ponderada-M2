// server.js
const app = require('./app');
const port = process.env.PORT || 3000; // Porta definida ou padrão 3000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log porta do servidor
});