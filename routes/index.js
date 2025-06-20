// routes/index.js
// Rotas para o CRUD de tarefas
const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');

router.post('/tarefas', TarefaController.criarTarefa);
router.get('/tarefas', TarefaController.listarTarefas);
router.put('/tarefas/:id', TarefaController.editarTarefa);
router.delete('/tarefas/:id', TarefaController.excluirTarefa);

module.exports = router;