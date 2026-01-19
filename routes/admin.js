// Routes for user endpoints
const express = require('express');
const router = express.Router();
const { pino } = require('../middlewares/logger');

// GET /api/about
// GET /api/about
router.get('/about', async (req, res) => {
    try {

        pino.info('Accessing GET /api/about endpoint');

        // רשימת המפתחים - שים לב: שמות השדות חייבים להיות כמו ב-users (first_name, last_name)
        const team = [
            { first_name: 'Henya', last_name: 'Nagar' },
            { first_name: 'Itzhak', last_name: 'Davidov' },
            { first_name: 'Roy', last_name: 'Binyaminovich' }
        ];

        res.json(team);
    } catch (error) {
        pino.error(`Error fetching users: ${err.message}`);
        res.status(500).json({
            id: 'USER_LIST_ERROR',
            message: 'Unable to fetch users'
        });
    }
});
// חובה לייצא את ה-router בסוף הקובץ
module.exports = router;