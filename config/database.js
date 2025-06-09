// config/database.js
require('dotenv').config();

const { Pool } = require('pg');

// Cria um pool de conexão com o banco de dados usando variáveis de ambiente
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

module.exports = {
  // Executa queries no banco de dados
  query: (text, params) => pool.query(text, params),
};