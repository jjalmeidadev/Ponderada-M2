const db = require('../config/database.js');

// Retorna todos os eventos ordenados pela data (ascendente)
async function getAllEvents() {
  const { rows } = await db.query('SELECT * FROM events ORDER BY date ASC');
  return rows;
}

// Cria um novo evento e retorna o registro criado
async function createEvent(event) {
  const { title, subtitle, description, date, image_path, organization_id } = event;
  const { rows } = await db.query(
    `INSERT INTO events (title, subtitle, description, date, image_path, organization_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, subtitle, description, date, image_path, organization_id]
  );
  return rows[0];
}

module.exports = {
  getAllEvents,
  createEvent,
};
