const client = require('@config/db');

class Dashboard {
  static async getData(values) {
    const res = await client.query(`
        SELECT
            SUM(CASE WHEN in_a AND NOT in_b THEN 1 ELSE 0 END) as a_only,
            SUM(CASE WHEN in_b AND NOT in_a THEN 1 ELSE 0 END) as b_only,
            SUM(CASE WHEN in_a AND in_b THEN 1 ELSE 0 END) as intersection
        FROM (
            SELECT p.id_participante,
                MAX(CASE WHEN r.id_pregunta = $1 AND r.valor = $2 THEN 1 ELSE 0 END) = 1 as in_a,
                MAX(CASE WHEN r.id_pregunta = $3 AND r.valor = $4 THEN 1 ELSE 0 END) = 1 as in_b
            FROM participante p
            LEFT JOIN respuesta r ON p.id_participante = r.id_participante
            GROUP BY p.id_participante
        ) as participant_sets;
    `, values);

    return res.rows;
  }
}

module.exports = Dashboard