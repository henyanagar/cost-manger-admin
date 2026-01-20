// Routes for admin endpoints
const express = require('express');
const router = express.Router();
const { pino } = require('../middlewares/logger');

// GET /api/about - get developers team
router.get('/about', async (req, res) => {
    try {
        pino.info('Accessing GET /api/about endpoint');

        // Team members list
        const team = [
            {
                first_name: 'Henya',
                last_name: 'Nagar'
            },
            {
                first_name: 'Itzhak',
                last_name: 'Davidov'
            },
            {
                first_name: 'Roy',
                last_name: 'Binyaminovich'
            }
        ];

        res.json(team);
    } catch (error) {
        pino.error(`Error in /api/about: ${error.message}`);
        res.status(500).json({
            id: 'ABOUT_ERROR',
            message: 'Unable to fetch team information'
        });
    }
});

module.exports = router;