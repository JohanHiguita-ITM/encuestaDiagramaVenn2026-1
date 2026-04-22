const client = require('@config/db');

class Dashboard {
  static async getData(sets) {
    const values = [];
    let pIdx = 1;
    const innerSelects = sets.map((set, i) => {
      const letter = String.fromCharCode(97 + i); // a, b, c
      if (set.type === 'pregunta') {
        const qId = parseInt(set.id_pregunta || set.questionId, 10);
        const val = set.valor || set.answerValue;
        values.push(qId, val);

        return `MAX(CASE WHEN r.id_pregunta = $${pIdx++} AND r.valor = $${pIdx++} THEN 1 ELSE 0 END) = 1 AS in_${letter}`;
      }
      else if (set.type === 'carrera') {
        const pId = parseInt(set.id_programa, 10);
        values.push(pId);

        // Envolvemos en MAX(CASE...) para evitar el error del GROUP BY
        return `MAX(CASE WHEN p.id_programa = $${pIdx++} THEN 1 ELSE 0 END) = 1 AS in_${letter}`;
      }
      else if (set.type === 'genero') {
        values.push(set.genero);

        // Envolvemos en MAX(CASE...) para evitar el error del GROUP BY
        return `MAX(CASE WHEN p.genero = $${pIdx++} THEN 1 ELSE 0 END) = 1 AS in_${letter}`;
      }
      return 'false';
    }).join(',\n           ');

    // 2. Construir las combinaciones (A, B, C, AB, AC, BC, ABC)
    const outerSelects = [];
    if (sets.length >= 1) outerSelects.push(`SUM(CASE WHEN in_a THEN 1 ELSE 0 END) AS "A"`);
    if (sets.length >= 2) {
      outerSelects.push(`SUM(CASE WHEN in_b THEN 1 ELSE 0 END) AS "B"`);
      outerSelects.push(`SUM(CASE WHEN in_a AND in_b THEN 1 ELSE 0 END) AS "AB"`);
    }
    if (sets.length === 3) {
      outerSelects.push(`SUM(CASE WHEN in_c THEN 1 ELSE 0 END) AS "C"`);
      outerSelects.push(`SUM(CASE WHEN in_a AND in_c THEN 1 ELSE 0 END) AS "AC"`);
      outerSelects.push(`SUM(CASE WHEN in_b AND in_c THEN 1 ELSE 0 END) AS "BC"`);
      outerSelects.push(`SUM(CASE WHEN in_a AND in_b AND in_c THEN 1 ELSE 0 END) AS "ABC"`);
    }

    // 3. Ensamblar el Query Final
    const query = `
      SELECT
        ${outerSelects.join(',\n        ')}
      FROM (
        SELECT p.id_participante,
               ${innerSelects}
        FROM participante p
        LEFT JOIN respuesta r ON p.id_participante = r.id_participante
        GROUP BY p.id_participante
      ) as participant_sets;
    `;

    const { rows } = await client.query(query, values);
    const row = rows[0];
    const formattedData = {};
    for (const key in row) {
      formattedData[key] = Number(row[key]) || 0;
    }

    return formattedData
  }
}

module.exports = Dashboard