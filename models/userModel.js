const db = require('../config/database');

const User = {
  async findByEmail(email) {
    const result = await db.query('SELECT * FROM participants WHERE email = $1', [email]);
    return result.rows[0];
  },
  async findById(id) {
    const result = await db.query('SELECT * FROM participants WHERE id = $1', [id]);
    return result.rows[0];
  }
};

module.exports = User;
