const express = require('express');
const path = require('path');
const router = express.Router();
const surveyController = require('../controllers/surveyController');
const db = require('../config/db');

// Root route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Survey App' });
});

// Survey routes
router.get('/surveys', surveyController.getAllSurveys);
router.get('/surveys/:id/questions', surveyController.getSurveyQuestions);
router.post('/surveys', surveyController.createSurvey);

// Login routes
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.post('/login', async (req, res) => {
  const { codigo } = req.body;

  if (!codigo || typeof codigo !== 'string') {
    return res.send('Invalid login code. <a href="/login">Try again</a>');
  }

  try {
    const query = `
      SELECT p.*
      FROM participante p
      JOIN participante_login l ON p.id_participante = l.id_participante
      WHERE l.codigo = $1
    `;
    const result = await db.query(query, [codigo.trim()]);

    if (result.rowCount === 1) {
      return res.redirect('/dashboard');
    }

    return res.send('Invalid login code. <a href="/login">Try again</a>');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error. Please try again later.');
  }
});

// Dashboard route
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

module.exports = router;