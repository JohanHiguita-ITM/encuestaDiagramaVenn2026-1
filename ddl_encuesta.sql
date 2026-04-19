CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE participante (
    id_participante SERIAL PRIMARY KEY,
    edad INT CHECK (edad > 0 AND edad < 120),
    genero VARCHAR(50),
    carrera VARCHAR(100),
    semestre INT CHECK (semestre > 0)
);

CREATE TABLE participante_login (
    id_participante INT PRIMARY KEY,
    codigo VARCHAR(64) NOT NULL UNIQUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expiracion TIMESTAMP NULL,
    CONSTRAINT fk_participante_login
        FOREIGN KEY (id_participante)
        REFERENCES participante(id_participante)
        ON DELETE CASCADE
);

CREATE TABLE pregunta (
    id_pregunta SERIAL PRIMARY KEY,
    id_categoria INT NOT NULL,
    texto_pregunta TEXT NOT NULL,
    CONSTRAINT fk_categoria 
        FOREIGN KEY (id_categoria) 
        REFERENCES categoria(id_categoria) 
        ON DELETE CASCADE
);

CREATE TABLE respuesta (
    id_respuesta SERIAL PRIMARY KEY,
    id_participante INT NOT NULL,
    id_pregunta INT NOT NULL,
    valor VARCHAR(255) NOT NULL,
    fecha_respuesta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_participante 
        FOREIGN KEY (id_participante) 
        REFERENCES participante(id_participante) 
        ON DELETE CASCADE,
    CONSTRAINT fk_pregunta 
        FOREIGN KEY (id_pregunta) 
        REFERENCES pregunta(id_pregunta) 
        ON DELETE CASCADE
);
