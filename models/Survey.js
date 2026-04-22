const client = require('@config/db');

class Survey {
  static async getAll() {
    const res = await client.query('SELECT * FROM categoria');
    return res.rows;
  }

  static async getQuestions(id) {
    const res = await client.query('SELECT * FROM pregunta WHERE id_categoria = $1', [id]);
    return res.rows;
  }

  static async create(title, questions) {
    // Insert category
    const catRes = await client.query('INSERT INTO categoria (nombre) VALUES ($1) RETURNING *', [title]);
    const category = catRes.rows[0];
    // Insert questions
    for (const q of questions) {
      await client.query('INSERT INTO pregunta (id_categoria, texto_pregunta) VALUES ($1, $2)', [category.id_categoria, q]);
    }
    return { ...category, questions };
  }

  static async getAllWithQuestions() {
    const res = await client.query(`
      SELECT c.id_categoria, c.nombre, p.id_pregunta, p.texto_pregunta
      FROM categoria c
      LEFT JOIN pregunta p ON c.id_categoria = p.id_categoria
      ORDER BY c.id_categoria, p.id_pregunta
    `);
    const categories = {};
    res.rows.forEach(row => {
      if (!categories[row.id_categoria]) {
        categories[row.id_categoria] = {
          id: row.id_categoria,
          nombre: row.nombre,
          preguntas: []
        };
      }
      if (row.id_pregunta) {
        categories[row.id_categoria].preguntas.push({
          id: row.id_pregunta,
          texto: row.texto_pregunta
        });
      }
    });
    return Object.values(categories);
  }

  static async saveResponses(participantId, responses) {
    const query = 'INSERT INTO respuesta (id_participante, id_pregunta, valor) VALUES ($1, $2, $3)';
    for (const response of responses) {
      await client.query(query, [participantId, response.id_pregunta, response.valor]);
    }
  }

  static async getParticipantResponses(participantId) {
    const query = `
      SELECT id_pregunta, valor
      FROM respuesta
      WHERE id_participante = $1
    `;
    const res = await client.query(query, [participantId]);
    return res.rows;
  }

  static async getAllQuestions() {
    // We select the ID and the text, ordered so they show up nicely in the dropdown
    const query = 'SELECT id_pregunta, texto_pregunta FROM pregunta ORDER BY id_pregunta ASC';
    const result = await client.query(query); // Adjust to your db driver
    
    return result.rows
  }
}

module.exports = Survey;