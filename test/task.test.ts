import request from 'supertest';
import app from '../src/app';
import db from '../src/db/memoryDB';
import { Server } from 'http';
import * as mailService from '../src/services/mailService';

jest.mock('../src/services/mailService', () => ({
  sendMail: jest.fn(),
}));

let server: Server;

beforeAll((done) => {
  server = app.listen(() => done());
});

afterAll((done) => {
  server.close(() => done());
});

beforeEach(() => {
  db.readAll().forEach(task => db.delete(task.id));
  jest.clearAllMocks();
});

describe('Task API', () => {
  it('devrait créer une tâche et envoyer un email', async () => {
    const response = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Test Task',
        description: 'Test Description'
      });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Task');
    expect(mailService.sendMail).toHaveBeenCalledWith(
      'Task Created: Test Task',
      'A new task was created',
      'noe.ledoux0321@gmail.com'
    );
  });

  it('devrait récupérer toutes les tâches', async () => {
    await request(app).post('/api/tasks').send({ title: 'Tâche 1', description: 'Description 1' });
    const response = await request(app).get('/api/tasks');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it('devrait récupérer une tâche par ID', async () => {
    const task = await request(app).post('/api/tasks').send({ title: 'Tâche 2', description: 'Description 2' });
    const response = await request(app).get(`/api/tasks/${task.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Tâche 2');
  });

  it('devrait mettre à jour une tâche', async () => {
    const task = await request(app).post('/api/tasks').send({ title: 'Tâche 3', description: 'Description 3' });
    const response = await request(app)
      .put(`/api/tasks/${task.body.id}`)
      .send({ title: 'Tâche 3 Modifiée', completed: true });
    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Tâche 3 Modifiée');
    expect(response.body.completed).toBe(true);
  });

  it('devrait supprimer une tâche', async () => {
    const task = await request(app).post('/api/tasks').send({ title: 'Tâche 4', description: 'Description 4' });
    const response = await request(app).delete(`/api/tasks/${task.body.id}`);
    expect(response.status).toBe(204);
  });
});
