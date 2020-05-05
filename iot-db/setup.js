'use strict';
require('dotenv').config();
const debug = require('debug')('iot-db:db:setup');
const db = require('./');
const inquirer = require('inquirer');
const chalk = require('chalk');

const prompt = inquirer.createPromptModule();

async function setup() {
  const answer = await prompt([
    {
      type: 'confirm',
      name: 'setup',
      message: 'This will destroy your database, are you sure?',
    },
  ]);

  if (!answer.setup) {
    return console.log(`${chalk.yellowBright('Nothing happen :)')}`);
  }
  const config = {
    database: process.env.DB_NAME || 'iot',
    username: process.env.DB_USERNAME || 'iot',
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'postgres',
    logging: (s) => debug(s),
    setup: process.env.DB_SETUP || true,
    nodeEnv: process.env.NODE_ENV,
  };

  await db(config).catch(handleFatalError);

  console.log(`${chalk.green('Success!')}`);
  process.exit(0);
}
function handleFatalError(err) {
  console.error(`${chalk.red('[Fatal error]')}`);
  console.error(err.stack);
  process.exit(1);
}

setup();
