const Dashboard = require('@models/Dashboard');

const getDashboardData = async (req, res) => {
    const { sets } = req.body;

    if (!sets || !Array.isArray(sets) || sets.length === 0 || sets.length > 3) {
        return res.status(400).json({ error: 'Must provide between 1 and 3 sets.' });
    }

    try {
        const result = await Dashboard.getData(sets);

        if (!result || result?.length === 0) return res.status(404);

        res.json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Database query failed' });
    }
}

module.exports = {
    getDashboardData
}