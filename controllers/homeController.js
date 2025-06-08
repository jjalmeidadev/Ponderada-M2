// Renderiza a página inicial
exports.index = (req, res) => {
  res.render('pages/home', { titulo: 'Página Inicial', mensagem: 'Bem-vindo ao nosso mini site MVC!' });
};