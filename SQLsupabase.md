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


