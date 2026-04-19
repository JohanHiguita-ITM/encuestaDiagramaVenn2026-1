const express = require('express');
const path = require('path');
const paths = require('@utils/paths');
const router = express.Router();
const surveyController = require('@controllers/surveyController');
const Participant = require('@models/Participant');
const db = require('@config/db');

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
  res.sendFile(path.join(paths.public, 'login.html'));
});

router.post('/login', async (req, res) => {
  const { codigo } = req.body;

  if (!codigo || typeof codigo !== 'string') {
    return res.send('Invalid login code. <a href="/login">Try again</a>');
  }

  try {
    const participant = await Participant.findByCode(codigo.trim());

    if (!participant) {
      return res.send('Invalid login code. <a href="/login">Try again</a>');
    }

    const needsInfo = [participant.edad, participant.genero, participant.carrera, participant.semestre].some(value => value === null);

    if (needsInfo) {
      return res.redirect(`/participant/info?code=${encodeURIComponent(codigo.trim())}`);
    }

    return res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('Server error. Please try again later.');
  }
});

router.get('/participant/info', (req, res) => {
  res.sendFile(path.join(paths.public, 'participant-info.html'));
});

router.post('/participant/info', async (req, res) => {
  const { code, edad, genero, carrera, semestre } = req.body;

  if (!code || !edad || !genero || !carrera || !semestre) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const participant = await Participant.findByCode(code.trim());

    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    await Participant.updateInfo(participant.id_participante, {
      edad: parseInt(edad, 10),
      genero: genero.trim(),
      carrera: carrera.trim(),
      semestre: parseInt(semestre, 10)
    });

    return res.json({ success: true });
  } catch (error) {
    console.error('Participant info saving error:', error);
    return res.status(500).json({ error: 'Unable to save participant information' });
  }
});

router.get('/admin', (req, res) => {
  res.sendFile(path.join(paths.public, 'admin.html'));
});

router.get('/admin/participants', async (req, res) => {
  try {
    const participants = await Participant.getAllWithCodes();
    res.json(participants);
  } catch (error) {
    console.error('Get participants error:', error);
    res.status(500).json({ error: 'Unable to load participants' });
  }
});

router.post('/admin/participants', async (req, res) => {
  try {
    const participant = await Participant.createEmptyWithCode();
    res.status(201).json(participant);
  } catch (error) {
    console.error('Create participant error:', error);
    res.status(500).json({ error: 'Unable to create participant' });
  }
});

// Dashboard route
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(paths.public, 'dashboard.html'));
});

module.exports = router;