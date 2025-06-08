const express = require('express');
const router = express.Router();
const path = require('path');

// Roteamento para páginas
router.get('/', (req, res) => {
  // Renderiza página inicial usando layout
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/page1')
  });
});

router.get('/about', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/page2')
  });
});


module.exports = router;
