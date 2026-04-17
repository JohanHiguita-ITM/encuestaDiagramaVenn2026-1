const express = require('express');
const path = require('path');
const router = express.Router();
const surveyController = require('../controllers/surveyController');

// Root route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Survey App' });
});

// Survey routes
router.get('/surveys', surveyController.getAllSurveys);
router.post('/surveys', surveyController.createSurvey);

// Login routes
router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Dummy authentication
  if (username === 'admin' && password === 'password') {
    res.redirect('/dashboard');
  } else {
    res.send('Invalid credentials. <a href="/login">Try again</a>');
  }
});

// Dashboard route
router.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

module.exports = router;