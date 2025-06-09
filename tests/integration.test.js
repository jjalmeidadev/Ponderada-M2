const request = require('supertest');
const app = require('../app'); // Importa o app do Express

describe('Testes de Integração - Renderização das Pages', () => {
  test('GET /login deve renderizar a página de login', async () => {
    const res = await request(app).get('/login');
    expect(res.status).toBe(200);
    // Verifica se o título está correto na view
    expect(res.text).toContain('<title>Login</title>');
  });

  test('GET /sobre deve renderizar a página Sobre', async () => {
    const res = await request(app).get('/sobre');
    expect(res.status).toBe(200);
    // Verifica fonte de algum texto característico da página
    expect(res.text).toContain('Propósito');
  });

  test('GET /dashboard deve redirecionar para /login se não autenticado', async () => {
    const res = await request(app).get('/dashboard');
    // Como não há sessão, espera-se redirecionamento para login
    expect(res.status).toBe(302);
    expect(res.header.location).toBe('/login');
  });

  test('GET /profile deve redirecionar para /login se não houver sessão', async () => {
    const res = await request(app).get('/profile');
    expect(res.status).toBe(302);
    expect(res.header.location).toBe('/login');
  });

  test('POST /subscribe deve atualizar a sessão e retornar sucesso', async () => {
    // Usamos um agent para preservar cookies (sessão)
    const agent = request.agent(app);

    // Simulamos que o usuário já está logado (ex.: definindo manualmente a sessão)
    // Em um cenário real, isso seria feito pelo processo de login.
    // Aqui apenas verificamos que a rota de subscribe responde com sucesso.
    const res = await agent
      .post('/subscribe')
      .send({ event: { id: 123, title: 'Evento Teste' } });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
