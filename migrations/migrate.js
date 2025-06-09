// migrations/migrate.js
const pool = require('../config/database.js');

// Função para criar a tabela "tarefas" se não existir
async function migrate() {
  const query = `
    CREATE TABLE IF NOT EXISTS tarefas (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(255) NOT NULL,
      descricao TEXT,
      status VARCHAR(50) DEFAULT 'pendente',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query); // Executa a query de criação da tabela
    console.log('Tabela "tarefas" criada com sucesso.');
  } catch (err) {
    console.error('Erro ao criar a tabela:', err.message);
  } finally {
    pool.end(); // Fecha a conexão
  }
}

migrate();