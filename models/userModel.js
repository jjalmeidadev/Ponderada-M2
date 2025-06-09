const db = require('../config/database');

// Funções para buscar e atualizar informações do usuário
const User = {
  async findByEmail(email) {
    const result = await db.query('SELECT * FROM participants WHERE email = $1', [email]);
    return result.rows[0];
  },
  async findById(id) {
    const result = await db.query('SELECT * FROM participants WHERE id = $1', [id]);
    return result.rows[0];
  },
  async updateEmail(userId, newEmail) {
    // Atualiza o e-mail do usuário no banco de dados
    const query = 'UPDATE users SET email = $1 WHERE id = $2';
    await db.query(query, [newEmail, userId]);
  }
};

module.exports = User;
