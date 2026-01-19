const request = require('supertest'); // This line is missing!
const app = require('../app');         // Ensure this points to your app.js

describe('Admin API', () => {

    test('GET /api/about should return developers team structure', async () => {
        const response = await request(app).get('/api/about');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);

        // Match the length to what is actually in your route (3 developers)
        expect(response.body.length).toBe(3);

        // Check the first item has the right "shape" without caring about the name
        expect(response.body[0]).toHaveProperty('first_name');
        expect(response.body[0]).toHaveProperty('last_name');

        // Verify that the values are strings, not specific names
        expect(typeof response.body[0].first_name).toBe('string');
    });
});