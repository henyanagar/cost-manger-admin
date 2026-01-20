// Server entry point - starts the Express application
const app = require('./app');
const { pino } = require('./middlewares/logger');
require('dotenv').config();

const PORT = process.env.PORT || 3004;

// Start server (no database needed for admin service)
app.listen(PORT, () => {
    console.log(`Admin service running on port ${PORT}`);
    pino.info(`Admin service started on port ${PORT}`);
});