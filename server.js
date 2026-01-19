// Server entry point - starts the Express application
const app = require('./app');
const { pino } = require('./middlewares/logger');
require('dotenv').config();

const PORT = process.env.PORT || 3004;
