INSERT INTO respuesta (id_participante, id_pregunta, valor) VALUES
-- Participante 1: Responde Música y Comida (Intersección M ∩ C)
(1, 1, 'Rock'), (1, 3, 'Bandeja Paisa'),

-- Participante 2: Responde Comida y Deporte (Intersección C ∩ D)
(2, 3, 'Pizza'), (2, 5, 'Fútbol'),

-- Participante 3: Responde TODO (Música, Comida y Deporte - El centro del diagrama)
(3, 1, 'Jazz'), (3, 3, 'Sushi'), (3, 5, 'Natación'),

-- Participante 4: Responde Solo Música (Diferencia M - Otros)
(4, 1, 'Pop'), (4, 2, 'Guitarra');