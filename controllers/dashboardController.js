const Dashboard = require('@models/Dashboard');

const getDashboardData = async (req, res) => {
    const { setA, setB } = req.body;

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