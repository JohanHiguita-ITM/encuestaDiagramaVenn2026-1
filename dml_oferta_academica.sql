INSERT INTO tipo_programa (id_tipo_programa, nombre) VALUES(1, 'Programas Tecnológicos');
INSERT INTO tipo_programa (id_tipo_programa, nombre) VALUES(2, 'Programas Universitarios');
INSERT INTO tipo_programa (id_tipo_programa, nombre) VALUES(3, 'Especializaciones');
INSERT INTO tipo_programa (id_tipo_programa, nombre) VALUES(4, 'Maestrías');
INSERT INTO tipo_programa (id_tipo_programa, nombre) VALUES(5, 'Doctorados');
SELECT setval('tipo_programa_id_tipo_programa_seq', 5);


-- Insertar Programas Tecnológicos (id_tipo_programa = 1)
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Análisis de Costos y Presupuestos');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Automatización Electrónica');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Construcción de Acabados Arquitectónicos');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Control de la Calidad');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Desarrollo de Aplicaciones para Dispositivos Móviles');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Desarrollo de Software');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Diseño y Programación de Soluciones de Software como Servicio');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Gestión Administrativa');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Gestión Comercial Virtual Dual');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Gestión de Redes de Telecomunicaciones');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Informática Musical');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Mantenimiento de Equipo Biomédico');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Sistemas de Producción');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (1, 'Tecnología en Sistemas Electromecánicos');

-- Insertar Programas Universitarios (id_tipo_programa = 2)
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Administración del Deporte');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Administración Tecnológica');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Artes de la Grabación y Producción Musical');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Artes Visuales');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ciencia y Tecnología de los Alimentos');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ciencias Ambientales');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Cine');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Contaduría Pública');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Diseño para la Comunicación Interactiva');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Física');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ingeniería de la Calidad');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ingeniería de Producción');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ingeniería de Sistemas');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ingeniería de Telecomunicaciones');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ingeniería Electromecánica');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ingeniería Electrónica');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ingeniería en Ciencias de Datos');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ingeniería en Diseño Industrial');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ingeniería Financiera');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Ingeniería Mecatrónica');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Interpretación y Traducción Lengua de Señas Colombiana – Español');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Marketing');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (2, 'Química Industrial');

-- Insertar Especializaciones (id_tipo_programa = 3)
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (3, 'Especialización en Bioinformática');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (3, 'Especialización en Ciberseguridad');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (3, 'Especialización en Gestión del Mantenimiento Industrial');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (3, 'Especialización en Ingeniería de Software');

-- Insertar Maestrías (id_tipo_programa = 4)
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (4, 'Maestría en Automatización y Control Industrial');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (4, 'Maestría en Estudios de Ciencia, Tecnología, Sociedad e Innovación');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (4, 'Maestría en Gestión de la Innovación Tecnológica, Cooperación y Desarrollo Regional');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (4, 'Maestría en Gestión de Organizaciones');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (4, 'Maestría en Gestión Energética Industrial');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (4, 'Maestría en Seguridad Informática');

-- Insertar Doctorados (id_tipo_programa = 5)
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (5, 'Doctorado en Ciencia y Tecnología');
INSERT INTO programa_academico (id_tipo_programa, nombre) VALUES (5, 'Doctorado en Ingeniería');