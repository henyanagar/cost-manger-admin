// Unit tests for admin service
const request = require('supertest');
const app = require('../app');

describe('Admin API', () => {

    // Test GET /api/about
    test('GET /api/about should return developers team structure', async () => {
        const response = await request(app).get('/api/about');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(3);

        // Check the first item has correct properties
        expect(response.body[0]).toHaveProperty('first_name');
        expect(response.body[0]).toHaveProperty('last_name');

        // Verify values are strings
        expect(typeof response.body[0].first_name).toBe('string');
        expect(typeof response.body[0].last_name).toBe('string');
    });

    // Test that all team members have required fields
    test('GET /api/about should return all members with first_name and last_name', async () => {
        const response = await request(app).get('/api/about');

        response.body.forEach((member) => {
            expect(member).toHaveProperty('first_name');
            expect(member).toHaveProperty('last_name');
            expect(member.first_name).toBeTruthy();
            expect(member.last_name).toBeTruthy();
        });
    });

    // Test 404 for non-existent endpoint
    test('GET /api/invalid should return 404', async () => {
        const response = await request(app).get('/api/invalid');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('id', 'NOT_FOUND');
    });

});