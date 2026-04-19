# Encuesta Diagrama Venn 2026-1

A standalone Express.js application for managing surveys.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.

## Usage

- Development: `npm run dev`
- Test: `npm run test`
- Production: `npm run prod`

The server will run on port 3000 by default.

## Environment configuration

Create a `.env` file using the settings below.

Required variables:

- `PORT=3000`
- `NODE_ENV=development`
- `DB_SSL=false`
- `DEV_DATABASE_URL=postgres://usuario:contraseña@localhost:5432/encuesta_dev`
- `TEST_DATABASE_URL=postgres://usuario:contraseña@localhost:5432/encuesta_test`
- `PROD_DATABASE_URL=postgres://usuario:contraseña@servidor:5432/encuesta_prod`

Optional fallback:

- `DATABASE_URL=postgres://usuario:contraseña@localhost:5432/encuesta_dev`

The app selects the database URL based on `NODE_ENV`:

- `development` uses `DEV_DATABASE_URL`
- `test` uses `TEST_DATABASE_URL`
- `production` uses `PROD_DATABASE_URL`

If no environment-specific URL is set, it falls back to `DATABASE_URL`.

Use `DB_SSL=true` only when your database requires SSL. For local development, keep `DB_SSL=false`.

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