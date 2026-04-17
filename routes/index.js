const express = require('express');
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
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login</title>
      <link rel="stylesheet" href="/css/login.css">
    </head>
    <body>
      <div class="login-container">
        <h1>Login</h1>
        <form id="login-form" action="/login" method="post">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required>
          <label for="password">Password:</label>
          <input type="password" id="password" name="password" required>
          <button type="submit">Login</button>
        </form>
        <p id="message"></p>
      </div>
      <script src="/js/login.js"></script>
    </body>
    </html>
  `);
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
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Dashboard</title>
    </head>
    <body>
      <h1>Welcome to the Dashboard</h1>
      <a href="/surveys">View Surveys</a>
    </body>
    </html>
  `);
});

module.exports = router;