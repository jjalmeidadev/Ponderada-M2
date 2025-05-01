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

US03 | Como usuário cadastrado, quero acessar meu perfil com minha lista de eventos inscritos já integrados ao meu Google Calendar, para que eu possa me organizar melhor e manter meus compromissos alinhados com a minha rotina.

A user story "Como participante interessado, quero visualizar a lista de eventos com imagens, descrições e datas, para que eu possa escolher em quais quero me inscrever com base nas informações apresentadas." atende aos critérios INVEST de forma que: seja independente, pela visualização poder ocorrer sem depender de outras funcionalidades externas, como o sistema de inscrição; negociável, de maneira que ajustes possam ser feitos em dimensões de mídias ou no scroll se necessário; valiosa, por tornar a agenda do usuário mais organizada pela natureza de acessibilidade da plataforma; estimável, pelos recursos serem mais simples e detalhadamente descritos, portanto podendo ser aplicados realisticamente em um curto período de tempo por uma equipe; uma história pequena, por se tratar da subjetividade da exposição das imagens e dados aos usuários em momentos específicos e testável, na medida que as ferramentas mencionadas podem ser testadas através dos editores de código a fim de verificar suas funcionalidades integralmente.

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

![imagem_2025-05-01_001739717](https://github.com/user-attachments/assets/762dd312-ff80-4a0c-a778-141804b8e523)

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
```sql
Table events {
  id integer [pk, increment]
  title varchar(100) [not null]
  subtitle varchar(200)
  description text
  start_date timestamp [not null]
  end_date timestamp
  image_url varchar(255)
  video_url varchar(255)
  organization_id integer [ref: > organization.id]
}

Table organization {
  id integer [pk, increment]
  name varchar (100) [not null]
}

Table members {
  id integer [pk, increment]
  organization_id integer [ref: > organization.id]
  user_id integer
}

Table participants {
  id integer [pk, increment]
  name varchar(100) [not null]
  email varchar(100) [not null, unique]
  document varchar(20) [unique]
  accepted_events_id boolean [default: false, ref: > events.id]
}

Table subscriptions {
  id integer [pk, increment]
  event_id integer [ref: > events.id]
  participant_id integer [ref: > participants.id]
  status varchar(20) [default: 'pending']
  subscription_date timestamp
}

```

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

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
