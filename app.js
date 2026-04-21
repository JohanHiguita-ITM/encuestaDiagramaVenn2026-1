const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.get("/api/respuestas", (req, res) => {
  res.json([
    { p1: 1, p2: 0, p3: 1 },
    { p1: 1, p2: 1, p3: 0 }
 ]);
});

module.exports = app;
