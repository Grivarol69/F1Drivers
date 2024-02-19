const request = require('supertest');
const express = require('express');
const router = require('../routes');  // Asegúrate de que esta ruta sea correcta
const app = express();

app.use('/', router);

describe('Router Endpoints', () => {
  // it('should respond with status 200 for GET /drivers', async () => {
  //   const response = await request(app).get('/drivers');
  //   expect(response.status).toBe(200);
  // });

  it('should respond with status 200 for GET /teams', async () => {
    const response = await request(app).get('/teams');
    expect(response.status).toBe(200);
  });

  // it('should respond with JSON for GET /drivers', async () => {
  //   const response = await request(app).get('/drivers');
  //   expect(response.type).toBe('application/json');
  // });

  it('should respond with JSON for GET /teams', async () => {
    const response = await request(app).get('/teams');
    expect(response.type).toBe('application/json');
  });

  
});
