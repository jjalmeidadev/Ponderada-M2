# Boilerplate MVC em Node.js com PostgreSQL

Este projeto é um boilerplate básico para uma aplicação Node.js seguindo o padrão MVC (Model-View-Controller), utilizando PostgreSQL como banco de dados.

A proposta de projeto escolhida foi a criação de uma plataforma de eventos, opção 3, descrita em detalhes no WAD do repositório.

A estrutura geral se assemelha a:

meu-projeto/

│

├── Comp_Ponderada1.md

│ 

├── Comp_Ponderada2.md

│
   
├── Comp_Ponderada3.md

│   

├── Comp_Ponderada4.md

│   

├── UX_Ponderada1.md

│

├── UX_Ponderada2.md

│  

├── UX_Ponderada3.md

│

├── modelo-banco.pdf

│           

└── database.js            # Arquivos de configuração (ex: conexão com banco)

├── controllers/           # Lógica de controle das requisições

   └── HomeController.js

├── models/                # Definição de modelos de dados (estrutura do banco)

   └── User.js

├── routes/                # Definição das rotas do sistema

   └── index.js

├── services/              # Serviços auxiliares do sistema

   └── userService.js

├── assets/                # Arquivos públicos como imagens e fontes

├── scripts/               # Arquivos de JavaScript públicos

├── styles/                # Arquivos CSS públicos

├── tests/                 # Arquivos de testes unitários

   └── example.test.js

├── .gitignore             # Arquivo para ignorar arquivos no Git

├── .env.example           # Arquivo de exemplo para variáveis de ambiente

├── jest.config.js         # Arquivo de configuração do Jest

├── package-lock.json      # Gerenciador de dependências do Node.js

├── package.json           # Gerenciador de dependências do Node.js

├── readme.md              # Documentação do projeto (Markdown)

├── server.js              # Arquivo principal que inicializa o servidor

└── rest.http              # Teste de endpoints (opcional)

└──template-PI-WAD.md      # Documento principal



## Requisitos

- Node.js (versão X.X.X)
- PostgreSQL (versão X.X.X)

## Instalação

1. **Clonar o repositório:**

```bash
   git clone https://github.com/seu-usuario/seu-projeto.git
   cd seu-projeto
```

2. **Instalar as dependências:**
    
```bash
npm install express
```
    
3. **Configurar o arquivo `.env`:**
    
Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias, como as configurações do banco de dados PostgreSQL.

Formato:
DB_HOST = 
DB_PORT = 
DB_USER = 
DB_PASSWORD = 
DB_DATABASE = 
    

Configuração do Banco de Dados
------------------------------

1. **Criar banco de dados:**
    
    Crie um banco de dados PostgreSQL com o nome especificado no seu arquivo `.env`.
    
2. **Executar o script SQL de inicialização:**
    
```bash
npm run init-db
```
    
Isso criará a tabela `users` no seu banco de dados PostgreSQL com UUID como chave primária e inserirá alguns registros de exemplo.
    

Funcionalidades
---------------

* **Padrão MVC:** Estrutura organizada em Model, View e Controller.
* **PostgreSQL:** Banco de dados relacional utilizado para persistência dos dados.
* **UUID:** Utilização de UUID como chave primária na tabela `users`.
* **Scripts com `nodemon`:** Utilização do `nodemon` para reiniciar automaticamente o servidor após alterações no código.
* **Testes:** Inclui estrutura básica para testes automatizados.

Scripts Disponíveis
-------------------

* `npm start`: Inicia o servidor Node.js.
* `npm run dev`: Inicia o servidor com `nodemon`, reiniciando automaticamente após alterações no código.
* `npm run test`: Executa os testes automatizados.
* `npm run test:coverage`: Executa os testes e gera um relatório de cobertura de código.
* `npm run migrate`: Executa as migrações localizadas em migrations
*`node server.js`: Executa o servidor local

**E para testar os endpoints do CRUD:**

Criar uma tarefa (POST /api/tarefas)

Listar todas as tarefas (GET /api/tarefas)

Editar uma tarefa (PUT /api/tarefas/:id)

Excluir uma tarefa (DELETE /api/tarefas/:id)

Estrutura de Diretórios
-----------------------

* **`config/`**: Configurações do banco de dados e outras configurações do projeto.
* **`controllers/`**: Controladores da aplicação (lógica de negócio).
* **`models/`**: Modelos da aplicação (definições de dados e interações com o banco de dados).
* **`routes/`**: Rotas da aplicação.
* **`tests/`**: Testes automatizados.
* **`views/`**: Views da aplicação (se aplicável).

Contribuição
------------

Contribuições são bem-vindas! Sinta-se à vontade para abrir um issue ou enviar um pull request.

Licença
-------

Este projeto está licenciado sob a Licença MIT.

Este README.md fornece uma visão geral clara do boilerplate, incluindo instruções de instalação, configuração do banco de dados, funcionalidades principais, scripts disponíveis, estrutura de diretórios, como contribuir e informações de licença. Certifique-se de personalizar as seções com detalhes específicos do seu projeto conforme necessário.
