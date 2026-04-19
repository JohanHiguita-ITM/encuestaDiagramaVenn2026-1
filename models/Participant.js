const crypto = require('crypto');
const db = require('@config/db');

class Participant {
  static generateCode() {
    return crypto.randomBytes(4).toString('hex').toUpperCase();
  }

  static async createEmpty() {
    const res = await db.query('INSERT INTO participante DEFAULT VALUES RETURNING *');
    return res.rows[0];
  }

  static async addLoginCode(id_participante, codigo) {
    await db.query(
      'INSERT INTO participante_login (id_participante, codigo) VALUES ($1, $2)',
      [id_participante, codigo]
    );
    return { id_participante, codigo };
  }

  static async createEmptyWithCode() {
    const participant = await this.createEmpty();

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const codigo = this.generateCode();
      try {
        await this.addLoginCode(participant.id_participante, codigo);
        return { ...participant, codigo };
      } catch (error) {
        if (error.code !== '23505') {
          throw error;
        }
      }
    }

    throw new Error('Unable to generate a unique participant code');
  }

  static async findByCode(codigo) {
    const res = await db.query(
      `
      SELECT p.*
      FROM participante p
      JOIN participante_login l ON p.id_participante = l.id_participante
      WHERE l.codigo = $1
      `,
      [codigo]
    );

    return res.rows[0] || null;
  }

  static async getAllWithCodes() {
    const res = await db.query(
      `
      SELECT p.id_participante, p.edad, p.genero, p.carrera, p.semestre, l.codigo
      FROM participante p
      LEFT JOIN participante_login l ON p.id_participante = l.id_participante
      ORDER BY p.id_participante
      `
    );

    return res.rows;
  }

  static async updateInfo(id_participante, { edad, genero, carrera, semestre }) {
    const res = await db.query(
      `
      UPDATE participante
      SET edad = $1,
          genero = $2,
          carrera = $3,
          semestre = $4
      WHERE id_participante = $5
      RETURNING *
      `,
      [edad, genero, carrera, semestre, id_participante]
    );

    return res.rows[0] || null;
  }
}

module.exports = Participant;
