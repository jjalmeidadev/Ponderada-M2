const { Event, Organization } = require('../models');

// Busca todos os eventos com associação à organização e renderiza o dashboard
Event.findAll({
  include: [
    {
      model: Organization,
      as: 'organization',
      attributes: ['name']
    }
  ]
})
  .then(events => {
    console.log(events); 
    res.render('pages/dashboard', { events });
  })
  .catch(err => {
    console.error(err);
    res.status(500).send('Erro de servidor ao buscar eventos');
  });