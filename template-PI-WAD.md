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

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

![Screenshot 2025-05-07 17 06 01](https://github.com/user-attachments/assets/54a188ca-f2b8-449e-bc2c-dce555483d36)

#### Entidades e Atributos

Principais tabelas, que espelham funcionalidades e usuários do website, reunidos:

| Entidade       | Atributos com Chaves                                                                 |
|----------------|------------------------------------------------------------------------------------|
| `events`       | `id` (PK), `title`, `subtitle`, `description`, `start_date`, `end_date`, `image_url`, `video_url` |
| `organization` | `id` (PK), `name`                                                  |
| `members`      | `id` (PK), `organization_id` (FK), `user_id` (FK)                       |
| `participants` | `id` (PK), `name`, `email`, `document` (CPF/RG), `accepted_events_id` (boolean)             |
| `subscriptions`| `id` (PK), `event_id` (FK), `participant_id` (FK), `status` ("pending"/"accepted"/"rejected"), `subscription_date` |

Código SQL utilizado na formação das tabelas:
```sql[Untitled.pdf](https://github.com/user-attachments/files/20092713/Untitled.pdf)

CREATE TABLE organization (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE events (
    id INTEGER PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(100),
    description TEXT,
    start_date TIMESTAMP NOT NULL,
    end_date TIMESTAMP NOT NULL,
    image_url VARCHAR(100),
    video_url VARCHAR(100),
    organization_id INTEGER REFERENCES organization(id)
);

CREATE TABLE members (
    id INTEGER PRIMARY KEY,
    organization_id INTEGER REFERENCES organization(id),
    user_id INTEGER
);

CREATE TABLE participants (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    document VARCHAR(20) UNIQUE,
    accepted_event_id INTEGER REFERENCES events(id)
);

CREATE TABLE subscriptions (
    id INTEGER PRIMARY KEY,
    event_id INTEGER REFERENCES events(id),
    participant_id INTEGER REFERENCES participants(id),
    status VARCHAR(50) DEFAULT 'pending',
    subscription_date TIMESTAMP
);


```

### 3.1.1 BD e Models (Semana 5)

O banco de dados Supabase se encontra em: https://supabase.com/dashboard/project/qboouhjwqxdsnbyiqbru

O arquivo "userModel.js" foi adicionado à pasta model, sendo responsável por estabelecer, através dos comandos SQL (CRUD), a seleção de todos os usuários, a especificação dos desejados de acordo com o id, a inserção e atualização de nome e e-mail conforme demanda do usuário e a remoção de usuários de acordo com o id.

### 3.2. Arquitetura (Semana 5)

![Screenshot 2025-05-14 13 36 31](https://github.com/user-attachments/assets/b127363a-ccf9-4ffc-929b-ec20d5457c9f)

A partir do momento em que as operações no controller, como as UPDATE e DELETE exemplificadas com as funções editarEvento() e deletarEvento(), são requisitadas, este buscará as informações necessárias para as alterações diretamente no banco de dados, ao estabelecer uma conexão com o Model (no caso, atributos como title e id). Feitas as mudanças, com o model atualizado, estas serão transmitidas através do sistema frontend à interface do usuário, já disponibilizadas de forma apresentável (como visto na aba de eventos do wireframe).

### 3.3. Wireframes (Semana 03)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

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

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que seu parceiro possa consultar caso ele se interessar em aprofundar. Um exemplo de referência de livro e de site:_<br>

---
---
