const db = require('../config/database');

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
    // Update user's email in the database
    const query = 'UPDATE users SET email = $1 WHERE id = $2';
    await db.query(query, [newEmail, userId]);
  }
};

module.exports = User;
