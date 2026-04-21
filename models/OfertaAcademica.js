const client = require('@config/db');

class OfertaAcademica {
  static async getAllOfertas() {
    const res = await client.query(`
        SELECT 
            tp.id_tipo_programa,
            tp.nombre AS categoria,
            JSON_AGG(
                JSON_BUILD_OBJECT(
                    'id_programa', pa.id_programa,
                    'nombre', pa.nombre
                ) ORDER BY pa.nombre -- Opcional: Ordena alfabéticamente los programas
            ) AS programas
        FROM tipo_programa tp
        LEFT JOIN programa_academico pa ON tp.id_tipo_programa = pa.id_tipo_programa
        GROUP BY tp.id_tipo_programa, tp.nombre
        ORDER BY tp.id_tipo_programa;
    `);

    return res.rows;
  }
}

module.exports = OfertaAcademica