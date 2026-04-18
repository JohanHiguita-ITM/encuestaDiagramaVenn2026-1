// Survey Controller
const Survey = require('../models/Survey');

const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.getAll();
    res.json({ surveys });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSurveyQuestions = async (req, res) => {
  try {
    const { id } = req.params;
    const questions = await Survey.getQuestions(id);
    if (!questions || questions.length === 0) {
      return res.status(404).json({ error: 'Survey not found or no questions' });
    }
    res.json({ id: parseInt(id, 10), questions: questions.map(q => q.texto_pregunta) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createSurvey = async (req, res) => {
  try {
    const { title, questions } = req.body;
    if (!title || !questions) {
      return res.status(400).json({ error: 'Title and questions are required' });
    }
    const survey = await Survey.create(title, questions);
    res.status(201).json({ message: 'Survey created', survey });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllSurveys,
  getSurveyQuestions,
  createSurvey
};