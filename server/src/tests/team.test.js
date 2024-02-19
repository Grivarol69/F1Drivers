const request = require('supertest');
const express = require('express');
const teamsRouter = require('../routes/teamsRouter');  // Asegúrate de que esta ruta sea correcta
const teamsController = require('../controllers/teamsController');  // Asegúrate de que esta ruta sea correcta

jest.mock('../controllers/teamsController');  // Mock del controlador

const app = express();
app.use('/', teamsRouter);

describe('Teams Router Endpoints', () => {
  it('should respond with status 200 and JSON data', async () => {
    const mockTeams = [{ name: 'Team A' }, { name: 'Team B' }];
    teamsController.getTeams.mockResolvedValue(mockTeams);

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(mockTeams);
  });

  it('should respond with status 403 and an error message on controller error', async () => {
    const errorMessage = 'An error occurred';
    teamsController.getTeams.mockRejectedValue(new Error(errorMessage));

    const response = await request(app).get('/');

    expect(response.status).toBe(403);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual({ msg: errorMessage });
  });
});
