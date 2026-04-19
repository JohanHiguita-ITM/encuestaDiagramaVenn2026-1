// Survey Model (PostgreSQL-based)
const client = require('../config/db');

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

  static async findById(id) {
    const res = await client.query('SELECT * FROM categoria WHERE id_categoria = $1', [id]);
    return res.rows[0] || null;
  }
}

module.exports = Survey;