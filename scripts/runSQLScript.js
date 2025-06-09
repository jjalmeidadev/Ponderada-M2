const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');
require('dotenv').config();

// Cria conexão com o banco de dados
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Função que executa o script SQL do arquivo init.sql
const runSQLScript = async () => {
  const filePath = path.join(__dirname, 'init.sql'); // Define o caminho do script
  const sql = fs.readFileSync(filePath, 'utf8'); // Lê o conteúdo do script

  try {
    await pool.query(sql); // Executa o script no banco de dados
    console.log('Script SQL executado com sucesso!');
  } catch (err) {
    console.error('Erro ao executar o script SQL:', err);
  } finally {
    await pool.end(); // Encerra a conexão com o banco
  }
};

runSQLScript();
