# Encuesta Diagrama Venn 2026-1

A standalone Express.js application for managing surveys.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.

## Usage

- Development: `npm run dev`
- Production: `npm start`

The server will run on port 3000 by default.

## API Endpoints

- GET / : Welcome message
- GET /surveys : Get all surveys
- GET /surveys/:id/questions : Get all questions for a specific survey
- POST /surveys : Create a new survey (body: { title, questions })
- GET /login : Login page (SSR)
- POST /login : Handle login (dummy auth: admin/password)
- GET /dashboard : Dashboard page after login

## Structure

- `server.js`: Entry point
- `app.js`: Express app setup
- `routes/`: Route definitions
- `controllers/`: Business logic
- `models/`: Data models
- `middleware/`: Custom middleware
- `config/`: Configuration
- `utils/`: Utilities
- `public/`: Static files
- `tests/`: Tests