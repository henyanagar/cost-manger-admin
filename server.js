// Server entry point - starts the Express application
const app = require('./app');
const mongoose = require('mongoose');
const { pino } = require('./middlewares/logger');
require('dotenv').config();

const PORT = process.env.PORT || 3004;

// Connect to MongoDB then start server
mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME
})
    .then(() => {
        console.log('Admin Service: Connected to MongoDB');
        pino.info('Admin Service connected to MongoDB');

        // Start server after DB connection
        app.listen(PORT, () => {
            console.log(`Admin service running on port ${PORT}`);
            pino.info(`Admin service started on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        pino.error('MongoDB connection failed');
        process.exit(1);
    });