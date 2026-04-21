# 1. Intersección ($A \cap B$): El cruce de dos mundos

`
-- Conjunto A: Comen comida rápida
SELECT id_participante 
FROM respuesta 
WHERE id_pregunta = 11 AND valor = 'Sí'

INTERSECT

-- Conjunto B: Hacen ejercicio diario
SELECT id_participante 
FROM respuesta 
WHERE id_pregunta = 21 AND valor = 'Sí';
`

## 2. Diferencia ($A - B$): Un conjunto excluyendo al otro
`
-- Conjunto A: Escuchan música al hacer tareas
SELECT id_participante 
FROM respuesta 
WHERE id_pregunta = 6 AND valor = 'Sí'

EXCEPT

-- Conjunto B: Cambian de género con frecuencia
SELECT id_participante 
FROM respuesta 
WHERE id_pregunta = 9 AND valor = 'Sí';
`

## 3. Unión ($A \cup B$): La suma de los conjuntos
`
-- Conjunto A: Estudiantes de Psicología (viene de la tabla participante)
SELECT id_participante 
FROM participante 
WHERE carrera = 'Psicología'

UNION

-- Conjunto B: Les gusta la comida casera (viene de la tabla respuesta)
SELECT id_participante 
FROM respuesta 
WHERE id_pregunta = 19 AND valor = 'Sí';
`