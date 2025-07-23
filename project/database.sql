CREATE DATABASE oneringmatch CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE `character_creation_log` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `number_characters_created` BIGINT UNSIGNED NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

insert into character_creation_log (uuid,number_characters_created) values ('bac370ea-dfca-4387-96d9-5fa7799e5088',65883);

CREATE TABLE `craftsmanship` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

insert into character_creation_log (uuid,description) values ('ec7c5dfe-f604-4aa3-b81b-691ba477e32d'); // Elven Craftsmanship
insert into character_creation_log (uuid,description) values ('222ac311-1d5b-4022-999e-853618fbc62d'); // Dwarven Craftsmanship
insert into character_creation_log (uuid,description) values ('4d8175a6-65ae-4cab-8ba4-426fb2840127'); // Númenórean Craftsmanship

CREATE TABLE `craftsmanship_translations` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `language` char(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`uuid`,`language`),
  FOREIGN KEY (uuid)
      REFERENCES craftsmanship(uuid) MATCH SIMPLE
      ON UPDATE NO ACTION
      ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

insert into character_creation_log (uuid,description) values ('ec7c5dfe-f604-4aa3-b81b-691ba477e32d','en-US','Elven Craftsmanship');
insert into character_creation_log (uuid,description) values ('222ac311-1d5b-4022-999e-853618fbc62d','en-US','Dwarven Craftsmanship');
insert into character_creation_log (uuid,description) values ('4d8175a6-65ae-4cab-8ba4-426fb2840127','en-US','Númenórean Craftsmanship');

insert into character_creation_log (uuid,description) values ('ec7c5dfe-f604-4aa3-b81b-691ba477e32d','pt-BR','Forja Élfica');
insert into character_creation_log (uuid,description) values ('222ac311-1d5b-4022-999e-853618fbc62d','pt-BR','Forja Anã');
insert into character_creation_log (uuid,description) values ('4d8175a6-65ae-4cab-8ba4-426fb2840127','pt-BR','Forja Numenoriana');

insert into character_creation_log (uuid,description) values ('ec7c5dfe-f604-4aa3-b81b-691ba477e32d','es-ES','Artesanía Élfica');
insert into character_creation_log (uuid,description) values ('222ac311-1d5b-4022-999e-853618fbc62d','es-ES','Artesanía Enana');
insert into character_creation_log (uuid,description) values ('4d8175a6-65ae-4cab-8ba4-426fb2840127','es-ES','Artesanía Númenóreana');

insert into character_creation_log (uuid,description) values ('ec7c5dfe-f604-4aa3-b81b-691ba477e32d','fr-FR','Artisanat Elfique');
insert into character_creation_log (uuid,description) values ('222ac311-1d5b-4022-999e-853618fbc62d','fr-FR','Artisanat Nain');
insert into character_creation_log (uuid,description) values ('4d8175a6-65ae-4cab-8ba4-426fb2840127','fr-FR','Artisanat Numénoréen');

insert into character_creation_log (uuid,description) values ('ec7c5dfe-f604-4aa3-b81b-691ba477e32d','de-DE','Elfenhandwerk');
insert into character_creation_log (uuid,description) values ('222ac311-1d5b-4022-999e-853618fbc62d','de-DE','Zwergenhandwerk');
insert into character_creation_log (uuid,description) values ('4d8175a6-65ae-4cab-8ba4-426fb2840127','de-DE','Númenóreisches Handwerk');

CREATE TABLE `weapons` (
  `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `number_characters_created` BIGINT UNSIGNED NOT NULL,
  `update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

------------------------------------------------

CREATE TABLE IF NOT EXISTS `status`
(
    `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `nome` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    CONSTRAINT status_pkey PRIMARY KEY (uuid),
    CONSTRAINT status_nome_key UNIQUE (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

insert into status (uuid,nome) values ('c1709625-a1ac-4740-b839-a5ea6be6e42b','Ativo');
insert into status (uuid,nome) values ('8a8bf05b-9160-44d7-b58a-de63ab9ee58b','Avaliação');
insert into status (uuid,nome) values ('191e3489-fb26-4d49-a30e-791f10324837','Desativado');

CREATE TABLE IF NOT EXISTS `perfis`
(
    `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `nome` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `status_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    CONSTRAINT perfis_pkey PRIMARY KEY (uuid),
    CONSTRAINT perfis_nome_key UNIQUE (nome),
    CONSTRAINT perfis_status_uuid_1bbd21c5_fk_status_uuid FOREIGN KEY (status_uuid)
        REFERENCES status (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

insert into perfis (uuid,nome,status_uuid) values ('be4b6f6a-061d-4631-adbe-df61b54951e3','Usuário','c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into perfis (uuid,nome,status_uuid) values ('b5e3a183-f1f2-4454-baa8-f58753bcb58b','Administrador','c1709625-a1ac-4740-b839-a5ea6be6e42b');

CREATE TABLE IF NOT EXISTS `usuarios`
(
    `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `login` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` varchar(999) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `nome_completo` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `nome_social` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `data_cadastro` timestamp NOT NULL,
    `ultima_alteracao` timestamp NOT NULL,
    `vezes_acessado` integer NOT NULL,
    `atualizado_pelo_usuario` boolean NOT NULL,
    `perfil_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `status_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    CONSTRAINT usuarios_pkey PRIMARY KEY (uuid),
    CONSTRAINT usuarios_login_key UNIQUE (login),
    CONSTRAINT usuarios_perfil_id_a22ec9aa_fk_perfis_uuid FOREIGN KEY (perfil_uuid)
        REFERENCES perfis (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT usuarios_status_uuid_fk_status_uuid FOREIGN KEY (status_uuid)
        REFERENCES status (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `usuarios_pictures`
(
    `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `usuario_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `url` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `url_original` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    `url_original_existe` boolean NOT NULL,
    `arquivo_carregado` boolean NOT NULL,
    PRIMARY KEY (uuid),
    FOREIGN KEY (usuario_uuid)
        REFERENCES usuarios (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `usuarios_curtidas`
(
    `id` bigint NOT NULL AUTO_INCREMENT,
    `data_curtida` timestamp NOT NULL,
    `usuario_curtido_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `usuario_que_curtiu_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (usuario_que_curtiu_uuid, usuario_curtido_uuid),
    FOREIGN KEY (usuario_curtido_uuid)
        REFERENCES usuarios (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    FOREIGN KEY (usuario_que_curtiu_uuid)
        REFERENCES usuarios (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `usuarios_seguidos`
(
    `id` bigint NOT NULL AUTO_INCREMENT,
    `data_que_seguiu` timestamp NOT NULL,
    `usuario_seguido_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `usuario_que_seguiu_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (id),
    UNIQUE (usuario_que_seguiu_uuid, usuario_seguido_uuid),
    FOREIGN KEY (usuario_que_seguiu_uuid)
        REFERENCES usuarios (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    FOREIGN KEY (usuario_seguido_uuid)
        REFERENCES usuarios (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `redes_tipos`
(
    `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `url_icone` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `status_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    PRIMARY KEY (uuid),
    CONSTRAINT redes_tipos_nome_key UNIQUE (nome),
    CONSTRAINT redes_tipos_status_uuid_fk_status_uuid FOREIGN KEY (status_uuid)
        REFERENCES status (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

insert into redes_tipos (uuid,nome,url_icone,status_uuid) values ('72fc4b33-d515-445c-a65f-b2a0e607c665','Instagram','img/redes/instagram.svg','c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into redes_tipos (uuid,nome,url_icone,status_uuid) values ('b9d5bd58-e7c9-4143-a2d9-ee7f4021a766','YouTube','img/redes/youtube.svg','c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into redes_tipos (uuid,nome,url_icone,status_uuid) values ('e7f3e34a-feb9-40cb-a280-2d4343660f0e','X (Twitter)','img/redes/x-twitter.svg','c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into redes_tipos (uuid,nome,url_icone,status_uuid) values ('c1f10cf4-fe8e-4b0d-9162-42e4bcb1e5f7','TikTok','img/redes/tiktok.svg','c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into redes_tipos (uuid,nome,url_icone,status_uuid) values ('4d3046ca-2dfd-4522-81cf-324ae2a977c9','Twitch','img/redes/twitch.svg','c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into redes_tipos (uuid,nome,url_icone,status_uuid) values ('bd641a83-1687-4b74-a4b9-803fa34762fa','Bluesky','img/redes/bluesky.svg','c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into redes_tipos (uuid,nome,url_icone,status_uuid) values ('aa310017-396e-43cf-b1b9-12847817b865','Discord','img/redes/discord.svg','c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into redes_tipos (uuid,nome,url_icone,status_uuid) values ('753eb065-c894-4fb2-9cc0-0ca66a798c9d','itch.io','img/redes/itch-io.svg','c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into redes_tipos (uuid,nome,url_icone,status_uuid) values ('27756938-c254-4700-84dc-a433f41cad0c','ArtStation','img/redes/artstation.svg','c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into redes_tipos (uuid,nome,url_icone,status_uuid) values ('c8c0c438-a2fe-476c-a4ec-cd53509b867d','Site','img/redes/globe-solid.svg','c1709625-a1ac-4740-b839-a5ea6be6e42b');

CREATE TABLE IF NOT EXISTS `redes_usuarios`
(
    `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `ordem` integer NOT NULL,
    `url` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `rede_tipo_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `usuario_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    CONSTRAINT redes_usuarios_pkey PRIMARY KEY (uuid),
    CONSTRAINT redes_usuarios_rede_tipo_id_613df13d_fk_redes_tipos_uuid FOREIGN KEY (rede_tipo_id)
        REFERENCES redes_tipos (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT redes_usuarios_usuario_id_e2df7013_fk_usuarios_uuid FOREIGN KEY (usuario_id)
        REFERENCES usuarios (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `categorias`
(
    `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `ordem` integer NOT NULL,
    `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `status_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    CONSTRAINT categorias_pkey PRIMARY KEY (uuid),
    CONSTRAINT categorias_status_uuid_fk_status_uuid FOREIGN KEY (status_uuid)
        REFERENCES status (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

insert into categorias (uuid,nome,ordem,status_uuid) values ('6f7d04bf-fb9a-4505-b17d-f8c2422f4749','RPG',0,'c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into categorias (uuid,nome,ordem,status_uuid) values ('62a1d699-5c49-4e55-ba52-b77f72845df4','Aventuras',1,'c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into categorias (uuid,nome,ordem,status_uuid) values ('01e9e133-b1f7-4660-93c3-2b781b10b122','Cenários',2,'c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into categorias (uuid,nome,ordem,status_uuid) values ('2b2c4fc1-32a2-412a-9f4c-e617e9369721','Livro Jogo',3,'c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into categorias (uuid,nome,ordem,status_uuid) values ('59d3a408-4c58-4c3c-8100-f51508936635','Boardgame',4,'c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into categorias (uuid,nome,ordem,status_uuid) values ('ebe01e0c-3a56-447e-a99a-8e9cfe54980a','Cardgame',5,'c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into categorias (uuid,nome,ordem,status_uuid) values ('a7e3a1e9-8148-4bc9-b63d-fe5cdd93eb84','Grids',6,'c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into categorias (uuid,nome,ordem,status_uuid) values ('fbfe9ab2-bb00-4052-9e4e-c1ba287fb257','Mapas',7,'c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into categorias (uuid,nome,ordem,status_uuid) values ('11bb9cc6-9c97-44be-8c1c-390a163e039f','Artes',8,'c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into categorias (uuid,nome,ordem,status_uuid) values ('16d03fc1-aeeb-4af5-bdec-24dd2a376fa8','Literatura',9,'c1709625-a1ac-4740-b839-a5ea6be6e42b');

CREATE TABLE IF NOT EXISTS `modalidades`
(
    `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `ordem` integer NOT NULL,
    `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `status_uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    CONSTRAINT modalidades_pkey PRIMARY KEY (uuid),
    CONSTRAINT modalidades_status_uuid_fk_status_uuid FOREIGN KEY (status_uuid)
        REFERENCES status (uuid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

insert into modalidades (uuid,nome,ordem,status_uuid) values ('5779fbab-dccb-47b8-9cfa-288bc5c8b634','Gratuito',0,'c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into modalidades (uuid,nome,ordem,status_uuid) values ('6d11037e-986f-4576-9678-3fd95f8e3206','Quanto quiser',1,'c1709625-a1ac-4740-b839-a5ea6be6e42b');
insert into modalidades (uuid,nome,ordem,status_uuid) values ('820433ff-be6f-43a8-ab3f-b56b31e1a2de','Com valor',2,'c1709625-a1ac-4740-b839-a5ea6be6e42b');

CREATE TABLE IF NOT EXISTS `usuarios_sessions`
(
    `uuid` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `email` varchar(999) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `jwt_token` varchar(10000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    `logado` boolean NOT NULL,
    `data_login` timestamp NOT NULL,
    `data_refresh` timestamp NOT NULL,
    CONSTRAINT usuarios_sessions_pkey PRIMARY KEY (uuid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
