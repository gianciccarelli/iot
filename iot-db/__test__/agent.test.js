'use strict';

require('dotenv').config();
let config = {
  database: process.env.DB_NAME || 'iot',
  username: process.env.DB_USERNAME || 'iot',
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || 'localhost',
  dialect: process.env.DB_DIALECT || 'postgres',
  logging: () => {},
  setup: process.env.DB_SETUP || true,
  nodeEnv: process.env.NODE_ENV,
};

let db = null;

beforeEach(async (done) => {
  const setupDatabase = require('../index');
  db = await setupDatabase(config);
  done();
});

test('Agent service should exist', () => {
  expect(db.Agent).toBeTruthy();
});
