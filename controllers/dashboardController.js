const Dashboard = require('@models/Dashboard');

const getDashboardData = async (req, res) => {
    const { sets } = req.body;

    if (!sets || !Array.isArray(sets) || sets.length === 0 || sets.length > 3) {
        return res.status(400).json({ error: 'Must provide between 1 and 3 sets.' });
    }

    try {
        // Parameterized inputs to prevent SQL Injection
        const values = [
            setA.questionId, setA.answerValue,
            setB.questionId, setB.answerValue
        ];

        const result = await Dashboard.getData(values);

        if (!result || result?.length === 0) return res.status(404);

        res.json(result[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed' });
    }
}


module.exports = {
    getDashboardData
}