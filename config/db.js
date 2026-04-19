require('dotenv').config();
const { Pool } = require('pg');

const env = process.env.NODE_ENV || 'development';
const dbConfig = {
  development: process.env.DEV_DATABASE_URL || process.env.DATABASE_URL,
  test: process.env.TEST_DATABASE_URL || process.env.DATABASE_URL,
  production: process.env.PROD_DATABASE_URL || process.env.DATABASE_URL
};

const connectionString = dbConfig[env] || dbConfig.development;

if (!connectionString) {
  throw new Error(
    `Missing database URL for NODE_ENV=${env}. Set DEV_DATABASE_URL, TEST_DATABASE_URL, PROD_DATABASE_URL, or DATABASE_URL.`
  );
}

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;