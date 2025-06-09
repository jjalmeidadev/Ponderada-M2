# Web Application Document - Projeto Individual - Módulo 2 - Inteli

## Nome do Projeto

#### Jaime Andrade de Almeida

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)

Para realizar a atividade, escolhi criar o sistema da opção 3: plataforma de eventos com gerenciamento de inscrições. Quero aplicar os conhecimentos do módulo para a criação de uma plataforma web que seja capaz de listar eventos de uma certa organização, de maneira que os responsáveis por estes sejam capazes de criar e editá-los com liberdade, enquanto potenciais participantes podem visualizar sobre o que se tratam e se desejam se inscrever, além de terem as informações referentes aos que já aceitaram participar. Caso se interessem em outros ainda não explorados, poderiam se cadastrar com seus respectivos e-mails, que seriam salvos em um banco de dados, permitindo a organização das equipes gestoras no que se refere à alocação de recursos e espaço, para que os encontros e dinâmicas ocorram de acordo com o esperado. O site conterá, portanto, os eventos disponíveis através do scroll na aba principal, imagens ou vídeos que os-caracterizem, títulos, subtítulos, descrições, datas e botões de inscrição. O usuário terá um perfil acessível por um botão que o-permitirá adicionar informações pessoais importantes, como nome e identidade, além de uma lista dos eventos dos quais estará presente para fácil visualização. Se possível, planejo integrar esta lista a sistemas como google calendar, de maneira que estes eventos se encaixem de maneira automática às rotinas já planejadas pelos usuários.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01)

![image](https://github.com/user-attachments/assets/2050d6f0-1628-4e36-91fe-b500e87a915c)

### 2.2. User Stories (Semana 01)

US01 | Como participante interessado, quero visualizar a lista de eventos com imagens, descrições e datas, para que eu possa escolher em quais quero me inscrever com base nas informações apresentadas.

US02 | Como organizador de eventos, quero criar, editar e gerenciar eventos na plataforma, para que eu possa divulgar atividades com autonomia e manter os dados atualizados para os participantes.

US03 | Como usuário cadastrado, quero acessar meu perfil com minha lista de eventos inscritos já visível, para que eu possa me organizar melhor e manter meus compromissos alinhados com a minha rotina.

A user story "Como participante interessado, quero visualizar a lista de eventos com imagens, descrições e datas, para que eu possa escolher em quais quero me inscrever com base nas informações apresentadas." atende aos critérios INVEST de forma que: seja independente, pela visualização poder ocorrer sem depender de outras funcionalidades externas, como o sistema de inscrição; negociável, de maneira que ajustes possam ser feitos em dimensões de mídias ou no scroll se necessário; valiosa, por tornar a agenda do usuário mais organizada pela natureza de acessibilidade da plataforma; estimável, pelos recursos serem mais simples e detalhadamente descritos, portanto podendo ser aplicados realisticamente em um curto período de tempo por uma equipe; uma história pequena, por se tratar da subjetividade da exposição das imagens e dados aos usuários em momentos específicos e testável, na medida que as ferramentas mencionadas podem ser testadas através dos editores de código a fim de verificar suas funcionalidades integralmente.



## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

![Screenshot 2025-06-06 10 18 57](https://github.com/user-attachments/assets/dff62f39-4c45-4530-a5f4-d78c2d858af9)


#### Entidades e Atributos

Principais tabelas que representam funcionalidades e usuários do website:

| Entidade       | Atributos com Chaves                                                                                                                                              |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `organization` | `id` (PK, SERIAL), `name` (TEXT NOT NULL UNIQUE)                                                                                                                  |
| `events`       | `id` (PK, SERIAL), `title` (TEXT NOT NULL), `subtitle` (TEXT), `description` (TEXT), `date` (TEXT), `image_path` (TEXT), `video_path` (TEXT), `organization_name` (FK para `organization(name)`) |
| `participants` | `id` (PK, SERIAL), `name` (TEXT NOT NULL), `email` (TEXT NOT NULL UNIQUE), `password` (TEXT), `accepted_event_id` (FK para `events(id)`)                          |


### Código SQL utilizado na formação das tabelas e inserções:

```sql
CREATE TABLE organization (
    id SERIAL PRIMARY KEY,
    name text NOT NULL UNIQUE
);


CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title text NOT NULL,
    subtitle text,
    description text,
    date text,
    image_path text,
    video_path text,
    organization_name text REFERENCES organization(name)
);

CREATE TABLE participants (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL UNIQUE,
    password text,
    accepted_event_id INTEGER REFERENCES events(id)
);


INSERT INTO organization (name) 
VALUES ('Unifesp'),
('CCSP'),
('UFMG'),
('RBLRJ'),
('ECN');


INSERT INTO events (title, subtitle, description, date, image_path, organization_name) 
VALUES
  ('🧭 Feira de Carreiras', 'Feira de Oportunidades', 'Empresas estarão recrutando no local, com oficinas de currículo, palestras sobre carreira e entrada gratuita para estudantes.', '22/05/2025', '/assets/imgfeat.png', 'Unifesp'),

  ('Festival de Arte', 'Arte Urbana', 'Celebração da arte urbana com murais, oficinas de grafite e apresentações de hip-hop, promovendo a cultura das ruas.', '15/09/2025', '/assets/festivalarte.png', 'CCSP'),

  ('Feira de Carreiras', 'Carreiras Universitárias', 'Evento gratuito com palestras sobre mercado de trabalho, oficinas de currículo e networking com empresas.', '22/08/2025', '/assets/feiracarreiras.png', 'UFMG'),

  ('Feira Literária', 'Feira Literária Nacional', 'Encontro de autores, lançamentos de livros e debates sobre literatura.', '10/07/2025', '/assets/feiraliteraria.png', 'RBLRJ'),

  ('Convenção de Jogos', 'Jogos Digitais', 'Apresentações de novos jogos, campeonatos de e-sports e palestras com desenvolvedores.', '30/04/2025', '/assets/convecaojogos.png', 'ECN');

INSERT INTO participants (name, email, password) 
VALUES ('Rogério Dias', 'rogeriodias@gmail.com', '321');


```

### 3.1.1 BD e Models (Semana 5)

O banco de dados Supabase se encontra em: https://supabase.com/dashboard/project/qboouhjwqxdsnbyiqbru

O arquivo "userModel.js" foi adicionado à pasta model, sendo responsável por estabelecer, através dos comandos SQL (CRUD), a seleção de todos os usuários, a especificação dos desejados de acordo com o id, a inserção e atualização de nome e e-mail conforme demanda do usuário e a remoção de usuários de acordo com o id.

### 3.2. Arquitetura (Semana 5)

![Screenshot 2025-06-06 10 20 58](https://github.com/user-attachments/assets/c4987db6-298d-4a92-97ba-c013bf285fbe)


A partir do momento em que as operações no controller, como as UPDATE e DELETE exemplificadas com as funções editarEvento() e deletarEvento(), são requisitadas, este buscará as informações necessárias para as alterações diretamente no banco de dados, ao estabelecer uma conexão com o Model (no caso, atributos como title e id). Feitas as mudanças, com o model atualizado, estas serão transmitidas através do sistema frontend à interface do usuário, já disponibilizadas de forma apresentável (como visto na aba de eventos do wireframe).

### 3.3. Wireframes (Semana 03)

#### Flow do Wireframe

![imagem_2025-05-10_181741085](https://github.com/user-attachments/assets/a06c94a5-0c21-4441-9e6e-74291926c9fe)

Este representa o caminho que o usuário comum irá percorrer ao longo do site, tendo a possibilidade inicialmente de acessar a aba sobre da tela inicial, e descobrir mais no que se refere à história deste, ou de imediatamente registrar sua conta com e-mail e senha e acessar a página principal, em que os eventos poderão ser visualizados com clareza, contendo  descrições explícitas e informativas. A partir do click no símbolo de perfil da upper bar, já presente na tela principal, o usuário também será capaz de acessar seu perfil, onde terá a união de suas informações registradas, incluindo foto, além da lista de eventos dos quais aceitou participar.

### Visão ampliada das abas:

*Tela Inicial: Login*

![imagem_2025-05-10_182537176](https://github.com/user-attachments/assets/75ef29cf-2056-49d8-848a-fa900df711da)


*Tela Inicial: Sobre*

![imagem_2025-05-10_182625199](https://github.com/user-attachments/assets/14c103ed-de0b-47d2-8c43-7d954fb382d3)


*Tela principal de usabilidade*

![imagem_2025-05-10_182722996](https://github.com/user-attachments/assets/b9197c98-e4eb-43ed-80b4-2ab59924810e)


*Tela de perfil mencionada da terceira User Story*

![imagem_2025-05-10_182753723](https://github.com/user-attachments/assets/bf8490da-df69-4ec1-8514-a3c771f59b78)

*Link do figma:* https://www.figma.com/design/IzgFYMhVmIgrSkbYs4mRgH/Ponderada-UX---Wireframe?node-id=0-1&t=MOpiX441b9jTnjpF-1  

Este wireframe se relaciona diretamente às user stories produzidas (majoritariamente US01 e US03), principalmente no quesito de demonstrar funcionalidades de visualização de uma lista de eventos (com título, subtítulo, data, descrição, mídias e organizações responsáveis), inscrição nestes, além da apresentação de um perfil acessível por um click na upper bar, que contém as informações pessoais do usuário (e-mail, documento como cpf, nome), junto dos eventos reunidos em uma seção a fim de fácil acesso.


### 3.4. Guia de estilos (Semana 05)

![imagem_2025-05-23_212849779](https://github.com/user-attachments/assets/bcb5f2f1-194f-42a1-a76f-6783e1a9439a)

![imagem_2025-05-23_213049826](https://github.com/user-attachments/assets/a9bf55f1-02db-4e36-b91d-2c6eaeaeb3be)

![imagem_2025-05-23_213417985](https://github.com/user-attachments/assets/660f85aa-ca80-45c2-8494-9d5d9e3fce5b)


### 3.5. Protótipo de alta fidelidade (Semana 05)

#### Visão com e sem grid na tela principal

![imagem_2025-05-23_213531478](https://github.com/user-attachments/assets/47f4cd34-966b-4f54-9972-4e7db1f7f3b4)

*Tela Inicial: Login*

![imagem_2025-05-23_213852322](https://github.com/user-attachments/assets/f18c29cc-4465-494b-a29a-7cb55420795f)

*Tela Inicial: Sobre*

![imagem_2025-05-23_213932054](https://github.com/user-attachments/assets/835005f4-b4f5-4507-9723-adc884d542b0)

*Tela principal de usabilidade sem grid*

![imagem_2025-05-23_214019936](https://github.com/user-attachments/assets/06ecabcb-cecb-4add-862a-30dfb2ef0584)

*Tela principal de usabilidade com grid*

![imagem_2025-05-23_214120587](https://github.com/user-attachments/assets/3955c8ce-16b2-4dbd-9760-415d19cfda0d)

*Tela de perfil mencionada da terceira User Story*

![imagem_2025-05-23_214211101](https://github.com/user-attachments/assets/fc1400b1-4d27-4717-a6bf-d17c3ac0193f)

*Link do figma:* https://www.figma.com/design/a4YE29BL94Zoz1XG7RHNpG/Ponderada-UX---Modelo-de-Alta-Fidelidade?node-id=0-1&t=9Mqifj9givgQ3taB-1


### 3.6. WebAPI e endpoints (Semana 05)

- **POST /tarefas**  
  Cria uma tarefa na interface com os dados requisitados pelo usuário.

- **GET /tarefas**  
  Exibe todas as tarefas existentes do sistema.

- **PUT /tarefas/:id**  
  Atualiza os dados de uma tarefa a partir de seu id.

- **DELETE /tarefas/:id**  
  Deleta uma tarefa do sistema a partir de seu id


### 3.7 Interface e Navegação (Semana 07)

*O desenvolvimento realizado levou, primeiramente em conta, o design realizado no figma, que pôde ser transferido a partir de suas bases nativas em CSS para o próprio VS Code, o que com inúmeros ajustes, permitiu com que o site ficasse idêntico ao design produzido inicialmente. Não só isso, como trouxe consigo a autenticação específica do usuário da user story, o acesso aos links do sobre, à interação customizada ao dashboard com imagem de perfil e cards com dados vindo diretamente do Supabase, além destes podendo ser implementados diretamente na seção "Inscrições" do perfil, também formulado com base na persona:*

![imagem_2025-06-08_213406156](https://github.com/user-attachments/assets/8c317ae8-04f2-4357-9ce1-14c291c04591)

![imagem_2025-06-08_213440290](https://github.com/user-attachments/assets/73dc02e8-67ab-41c7-800a-fba47455c878)

![imagem_2025-06-08_213516910](https://github.com/user-attachments/assets/006dc75d-a5b8-445d-b93a-26449bcdae72)

![imagem_2025-06-08_213535879](https://github.com/user-attachments/assets/13e97ed2-f350-4c50-b9af-4b2ea90fe39b)

*O design, portanto, foi complementado pelo extenso arquivo CSS, em que posições, tamanhos e caminhos das imagens, todos feitos à mão, foram realocados e ajustados, permitindo fidelidade à proposta. Também foram produzidos arquivos de rotas, de forma à abranger aos quatro arquivos.ejs e suas respectivas funções, como a criação, por exemplo, de uma sessão específica que guarda os cards selecionados no dashboard e os-posiciona na aba de perfil, já organizados dentro da seção específica. Também foram produzidos testes, verificando a renderização das páginas, que recebem dados de acordo com o modelo fetch:*

![imagem_2025-06-08_213643228](https://github.com/user-attachments/assets/af2bacdc-3948-4eff-a3c1-a62c85fdad45)

![imagem_2025-06-08_213715948](https://github.com/user-attachments/assets/768dfa41-afea-49eb-b10f-fad0960ba114)

![imagem_2025-06-08_213740879](https://github.com/user-attachments/assets/5f1a34a6-a9f7-4a0c-833c-7bf8071b2826)

![imagem_2025-06-08_213825800](https://github.com/user-attachments/assets/0d8fdf3e-e886-4a35-8139-999b36cde843)

![imagem_2025-06-08_213904927](https://github.com/user-attachments/assets/0e2dda9d-5c1c-4e9d-8195-102751752396)

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: link do vídeo demonstrativo*

[606768cf-03e4-40ea-9f49-7d530a54f107.webm](https://github.com/user-attachments/assets/c74fc4f4-c9c3-4e46-8301-d8d13bca2a7b)

*O desenvolvimento realizado levou, primeiramente em conta, o design realizado no figma, que pôde ser transferido a partir de suas bases nativas em CSS para o próprio VS Code, o que com inúmeros ajustes, permitiu com que o site ficasse idêntico ao design produzido inicialmente. Não só isso, como trouxe consigo a autenticação específica do usuário da user story, o acesso aos links do sobre, à interação customizada ao dashboard com imagem de perfil e cards com dados vindo diretamente do Supabase, além destes podendo ser implementados diretamente na seção "Inscrições" do perfil, também formulado com base na persona:*

![imagem_2025-06-08_213406156](https://github.com/user-attachments/assets/8c317ae8-04f2-4357-9ce1-14c291c04591)

![imagem_2025-06-08_213440290](https://github.com/user-attachments/assets/73dc02e8-67ab-41c7-800a-fba47455c878)

![imagem_2025-06-08_213516910](https://github.com/user-attachments/assets/006dc75d-a5b8-445d-b93a-26449bcdae72)

![imagem_2025-06-08_213535879](https://github.com/user-attachments/assets/13e97ed2-f350-4c50-b9af-4b2ea90fe39b)

*O design, portanto, foi complementado pelo extenso arquivo CSS, em que posições, tamanhos e caminhos das imagens, todos feitos à mão, foram realocados e ajustados, permitindo fidelidade à proposta. Também foram produzidos arquivos de rotas, de forma à abranger aos quatro arquivos.ejs e suas respectivas funções, como a criação, por exemplo, de uma sessão específica que guarda os cards selecionados no dashboard e os-posiciona na aba de perfil, já organizados dentro da seção específica. Também foram produzidos testes, verificando a renderização das páginas, que recebem dados de acordo com o modelo fetch:*

![imagem_2025-06-08_213643228](https://github.com/user-attachments/assets/af2bacdc-3948-4eff-a3c1-a62c85fdad45)

![imagem_2025-06-08_213715948](https://github.com/user-attachments/assets/768dfa41-afea-49eb-b10f-fad0960ba114)

![imagem_2025-06-08_213740879](https://github.com/user-attachments/assets/5f1a34a6-a9f7-4a0c-833c-7bf8071b2826)

![imagem_2025-06-08_213825800](https://github.com/user-attachments/assets/0d8fdf3e-e886-4a35-8139-999b36cde843)

![imagem_2025-06-08_213904927](https://github.com/user-attachments/assets/0e2dda9d-5c1c-4e9d-8195-102751752396)

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)


 Os pontos fortes do projeto são evidentes já no primeiro acesso: há uma atenção significativa aos detalhes de design e identidade visual, com uma proposta clara de criar uma marca original, com valores e propósitos bem definidos. Além disso, a concepção do "produto" foi transposta de forma eficiente para o código, estruturado segundo o padrão MVC. O projeto conta com documentação, instruções claras e arquivos bem organizados (JS, CSS e HTML), resultando em um ambiente funcional, ainda que em estágio inicial, alinhado ao objetivo da atividade.
 Outro destaque é a integração direta com o banco de dados Supabase, utilizando variáveis de ambiente (.env). Essa abordagem não só torna a aplicação mais segura, como também mais escalável, permitindo que os dados sejam alterados sob demanda e, assim, tornando a funcionalidade principal do site mais flexível.

Como pontos de melhoria, vejo como relevantes:

- Implementar login via Google para facilitar o acesso do público geral

- Tornar todas as telas responsivas, garantindo boa usabilidade em diferentes dispositivos

- Criptografar as senhas durante a comunicação cliente-servidor, aumentando a segurança

- Permitir que usuários comuns adicionem eventos via interface

- Incluir um retorno claro à tela inicial após determinadas ações

- Guardar os dados de cada interação no banco de dados

Além disso, há espaço para evoluir o projeto para uma extensão de navegador integrada a serviços como o Google Calendar, um caminho para ampliar seu impacto e utilidade.


## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

Um site que me inspirou na atenção ao detalhe foi este: https://pingback.com/certificacao/home?utm_medium=rock-convert&utm_source=rock&utm_campaign=blog
