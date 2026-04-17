// Survey Controller
const Survey = require('../models/Survey');

const getAllSurveys = (req, res) => {
  const surveys = Survey.getAll();
  res.json({ surveys });
};

const createSurvey = (req, res) => {
  const { title, questions } = req.body;
  if (!title || !questions) {
    return res.status(400).json({ error: 'Title and questions are required' });
  }
  const survey = Survey.create(title, questions);
  res.status(201).json({ message: 'Survey created', survey });
};

module.exports = {
  getAllSurveys,
  createSurvey
};