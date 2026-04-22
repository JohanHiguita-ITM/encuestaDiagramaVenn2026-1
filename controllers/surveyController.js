// Survey Controller
const Survey = require('@models/Survey');

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

const getSurveyData = async (req, res) => {
  try {
    const data = await Survey.getAllWithQuestions();
    res.json({ categories: data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const submitResponses = async (req, res) => {
  try {
    const { code, responses } = req.body;
    if (!code || !responses || !Array.isArray(responses)) {
      return res.status(400).json({ error: 'Code and responses are required' });
    }
    const participant = await require('@models/Participant').findByCode(code);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }
    await Survey.saveResponses(participant.id_participante, responses);
    res.json({ message: 'Responses saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getParticipantResponses = async (req, res) => {
  try {
    const { code } = req.params;
    if (!code || typeof code !== 'string') {
      return res.status(400).json({ error: 'Invalid code format' });
    }
    const participant = await require('@models/Participant').findByCode(code);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }
    const responses = await Survey.getParticipantResponses(participant.id_participante);
    res.json({ responses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const response = await Survey.getAllQuestions();
    res.json(response)
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

const getAllCareers = async (req, res) => {
  try {
    const response = await Survey.getAllCareers();
    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getAllSurveys,
  getSurveyQuestions,
  createSurvey,
  getSurveyData,
  submitResponses,
  getParticipantResponses,
  getAllQuestions,
  getAllCareers
};