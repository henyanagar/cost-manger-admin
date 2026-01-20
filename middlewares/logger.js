// Pino logger middleware
// Logs every HTTP request locally and to logs service
const pino = require('pino')();

// Middleware to log every HTTP request
const requestLogger = async (req, res, next) => {
    // Wait for response to finish to get status code
    res.on('finish', async () => {
        const path = req.originalUrl.toLowerCase();
        let action = 'Unknown Action';

        // Determine action description based on request
        if (req.method === 'GET' && path.includes('/about')) {
            action = 'Get Team Members';
        } else {
            action = `${req.method} ${req.originalUrl}`;
        }

        const logData = {
            service: 'admin-service',
            level: res.statusCode >= 400 ? 'error' : 'info',
            msg: `${action} - ${res.locals.errorId || res.statusCode}`,
            method: req.method,
            url: req.originalUrl,
            statusCode: res.statusCode,
            time: Date.now()
        };

        // Local log for console
        pino.info(logData.msg);

        // Remote log to Logs API database
        try {
            const logApiUrl = process.env.LOG_API_URL;
            if (logApiUrl) {
                await fetch(`${logApiUrl}/api/logs/add`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(logData)
                });
            }
        } catch (err) {
            // Fallback if Logs API is down
            pino.error(`Remote log failed: ${err.message}`);
        }
    });

    next();
};

module.exports = {
    requestLogger,
    pino
};