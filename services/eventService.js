const db = require('../config/database.js'); // Replace or point to your DB client/pool

async function getAllEvents() {
  const { rows } = await db.query('SELECT * FROM events ORDER BY date ASC');
  return rows;
}

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
