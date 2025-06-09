// controllers/TarefaController.js
const pool = require('../config/database');

// Cria uma nova tarefa
exports.criarTarefa = async (req, res) => {
  const { nome, descricao } = req.body;
  const query = 'INSERT INTO tarefas (nome, descricao) VALUES ($1, $2) RETURNING *';
  const values = [nome, descricao];

  try {
    const result = await pool.query(query, values); // Executa a inserção
    const tarefa = result.rows[0];
    res.status(201).json(tarefa);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lista todas as tarefas
exports.listarTarefas = async (req, res) => {
  const query = 'SELECT * FROM tarefas';
  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edita uma tarefa existente
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, status } = req.body;
  const query = `
    UPDATE tarefas SET nome = $1, descricao = $2, status = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4 RETURNING *
  `;
  const values = [nome, descricao, status, id];

  try {
    const result = await pool.query(query, values); // Executa a atualização
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exclui uma tarefa
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tarefas WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values); // Executa a exclusão
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};