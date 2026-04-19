// Basic test placeholder
require('module-alias/register');
const request = require('supertest');
const app = require('@root/app');

describe('GET /', () => {
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });
});