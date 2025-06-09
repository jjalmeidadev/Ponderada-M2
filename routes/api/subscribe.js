const express = require('express');
const router = express.Router();

// Rota para inscrição: adiciona o evento à sessão
router.post('/', (req, res) => {
  if (!req.session.subscribedEvents) {
    req.session.subscribedEvents = [];
  }
  req.session.subscribedEvents.push(req.body.event);
  res.json({ success: true });
});

module.exports = router;
