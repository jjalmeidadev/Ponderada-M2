const db = require('../config/database');

const User = {
  async findByEmail(email) {
    // Retorna o usuário com base no e-mail
    const result = await db.query('SELECT * FROM participants WHERE email = $1', [email]);
    return result.rows[0];
  },
  async findById(id) {
    // Retorna o usuário com base no ID
    const result = await db.query('SELECT * FROM participants WHERE id = $1', [id]);
    return result.rows[0];
  },
  async updateEmail(userId, newEmail) {
    // Atualiza o e-mail do usuário
    await db.query('UPDATE users SET email = $1 WHERE id = $2', [newEmail, userId]);
  }
};

module.exports = User;
