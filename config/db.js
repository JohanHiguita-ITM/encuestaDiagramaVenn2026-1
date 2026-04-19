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

const useSsl = process.env.DB_SSL === 'true' || env === 'production';
const poolConfig = { connectionString };

if (useSsl) {
  poolConfig.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(poolConfig);

module.exports = pool;