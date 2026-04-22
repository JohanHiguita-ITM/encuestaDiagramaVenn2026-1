const client = require('@config/db');

class Dashboard {
  static async getData(sets) {
    const values = [];
    let pIdx = 1;
    const ctes = [];
    const setNames = [];

    // 1. Construir las "Tablas Temporales" (CTEs) para cada conjunto de filtros
    // Usamos DISTINCT para asegurar que no contemos participantes duplicados
    sets.forEach((set, i) => {
      const letter = String.fromCharCode(97 + i); // a, b, c
      setNames.push(letter);

      if (set.type === 'pregunta') {
        const qId = parseInt(set.id_pregunta || set.questionId, 10);
        const val = set.valor || set.answerValue;
        values.push(qId, val);
        
        ctes.push(`set_${letter} AS (
          SELECT DISTINCT id_participante 
          FROM respuesta 
          WHERE id_pregunta = $${pIdx++} AND valor = $${pIdx++}
        )`);
      } 
      else if (set.type === 'carrera') {
        const pId = parseInt(set.id_programa, 10);
        values.push(pId);
        
        ctes.push(`set_${letter} AS (
          SELECT DISTINCT id_participante 
          FROM participante 
          WHERE id_programa = $${pIdx++}
        )`);
      } 
      else if (set.type === 'genero') {
        values.push(set.genero);
        
        ctes.push(`set_${letter} AS (
          SELECT DISTINCT id_participante 
          FROM participante 
          WHERE genero = $${pIdx++}
        )`);
      }
    });

    if (ctes.length === 0) return {};

    // 2. Construir los conteos e intersecciones (El Diagrama de Venn)
    const selects = [];

    if (setNames.length >= 1) {
      selects.push(`(SELECT COUNT(*) FROM set_a) AS "A"`);
    }
    if (setNames.length >= 2) {
      selects.push(`(SELECT COUNT(*) FROM set_b) AS "B"`);
      // Intersección AB: Los que están en A y también en B
      selects.push(`(SELECT COUNT(*) FROM set_a INNER JOIN set_b USING(id_participante)) AS "AB"`);
    }
    if (setNames.length === 3) {
      selects.push(`(SELECT COUNT(*) FROM set_c) AS "C"`);
      selects.push(`(SELECT COUNT(*) FROM set_a INNER JOIN set_c USING(id_participante)) AS "AC"`);
      selects.push(`(SELECT COUNT(*) FROM set_b INNER JOIN set_c USING(id_participante)) AS "BC"`);
      // Intersección ABC: Los que están en A, B y C
      selects.push(`(SELECT COUNT(*) FROM set_a INNER JOIN set_b USING(id_participante) INNER JOIN set_c USING(id_participante)) AS "ABC"`);
    }

    // 3. Ensamblar el Query Final con la cláusula WITH
    const query = `
      WITH ${ctes.join(',\n      ')}
      SELECT
        ${selects.join(',\n        ')};
    `;

    // Ejecutar en base de datos
    const { rows } = await client.query(query, values);
    const row = rows[0];
    const formattedData = {};
    
    // Parsear los resultados a números (ya que COUNT retorna un BigInt/String en Node)
    for (const key in row) {
      formattedData[key] = Number(row[key]) || 0;
    }

    return formattedData;
  }
}

module.exports = Dashboard;