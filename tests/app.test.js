// Basic test placeholder
require('module-alias/register');
const request = require('supertest');
const app = require('@root/app');

describe('GET /', () => {
  it('should redirect to login', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toEqual('/login');
  });
});