const { Event, Organization } = require('../models');

// Atualizado: Função para buscar eventos e renderizar o dashboard
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: [{
        model: Organization,
        as: 'organization',
        attributes: ['name']
      }]
    });
    console.log(events); // Log dos eventos retornados
    res.render('pages/dashboard', { events });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro de servidor ao buscar eventos');
  }
};

module.exports = { getAllEvents };