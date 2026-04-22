const client = require('@config/db');

class Dashboard {
    static async getData(sets) {
        // 2. Build the Inner Query (Participant Flags: in_a, in_b, in_c)
        // We map through the array to create the MAX(CASE...) statements.
        // We multiply the index to correctly assign the $1, $2, $3 parameters for Postgres.
        const innerSelects = sets.map((_, i) => {
            const letter = String.fromCharCode(97 + i); // 'a', 'b', 'c'
            const param1 = i * 2 + 1; // 1, 3, 5
            const param2 = i * 2 + 2; // 2, 4, 6
            return `MAX(CASE WHEN r.id_pregunta = $${param1} AND r.valor = $${param2} THEN 1 ELSE 0 END) = 1 AS in_${letter}`;
        }).join(',\n           ');

        // 3. Build the Outer Query (The Combinations)
        // The Venn plugin expects the INCLUSIVE totals for each intersection
        const outerSelects = [];

        // Single Sets
        if (sets.length >= 1) outerSelects.push(`SUM(CASE WHEN in_a THEN 1 ELSE 0 END) AS "A"`);
        if (sets.length >= 2) outerSelects.push(`SUM(CASE WHEN in_b THEN 1 ELSE 0 END) AS "B"`);
        if (sets.length >= 3) outerSelects.push(`SUM(CASE WHEN in_c THEN 1 ELSE 0 END) AS "C"`);

        // Two-way Intersections
        if (sets.length >= 2) outerSelects.push(`SUM(CASE WHEN in_a AND in_b THEN 1 ELSE 0 END) AS "AB"`);
        if (sets.length >= 3) {
            outerSelects.push(`SUM(CASE WHEN in_a AND in_c THEN 1 ELSE 0 END) AS "AC"`);
            outerSelects.push(`SUM(CASE WHEN in_b AND in_c THEN 1 ELSE 0 END) AS "BC"`);
        }

        // Three-way Intersection
        if (sets.length === 3) {
            outerSelects.push(`SUM(CASE WHEN in_a AND in_b AND in_c THEN 1 ELSE 0 END) AS "ABC"`);
        }

        // 4. Construct the Final SQL String
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

        // 5. Flatten the parameters array for the database execution
        // e.g., [{qId: 1, val: 'Yes'}, {qId: 2, val: 'No'}] becomes [1, 'Yes', 2, 'No']
        const values = sets.flatMap(s => [s.questionId, s.answerValue]);

        // 6. Execute the query
        const result = await client.query(query, values); // Adjust based on your db driver (pg, etc.)

        // Node-postgres (pg) sometimes returns SUM() aggregations as strings to prevent JS integer overflow.
        // We convert them back to standard numbers so Chart.js can read them properly.
        const row = result.rows[0];
        const formattedData = {};
        for (const key in row) {
            formattedData[key] = Number(row[key]);
        }

        // Return the perfectly formatted object back to Vue
        return formattedData
    }
}

module.exports = Dashboard