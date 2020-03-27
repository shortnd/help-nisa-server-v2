process.env.NODE_ENV = 'test';

const { MongoMemoryServer } = require('mongodb-memory-server');

const app = require('../app.js');
const request = require('supertest');
const db = require('../db');

const context = {};

beforeAll(async function() {
  context.mongoServer = new MongoMemoryServer();
  const uri = await context.mongoServer.getConnectionString();
  await db.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
});

afterAll(() => {
  db.disconnect();
  context.mongoServer.stop();
});

describe('Tests without auth', () => {
  describe('No Players', () => {
    test('/GET response should return 200', async () => {
      const response = await request(app).get('/api/players')
      expect(response.status).toEqual(200);
    }, 5000);

    test('/GET should return an empty array', async () => {
      const response = await request(app).get('/api/players');
      expect(response.body).toEqual([]);
    }, 5000);

    test('/POST to /players should return error', async () => {
      const response = await request(app).post('/api/players').send();
      expect(response.status).toEqual(400);
      expect(response).toHaveProperty('body');
    }, 5000);
  });

  describe('With Players', () => {
    let player = {
      name: "Nate Stinewasher",
      position: "Goalkeeper",
      number: 0
    }
    test('POST to /players return a new player', async () => {
      const response = await request(app).post('/api/players').send(player);
      expect(response.status).toEqual(200);
      expect(response).toHaveProperty('body');
      expect(response.body).toHaveProperty('name');
      expect(response.body.name).toEqual("Nate Stinewasher");
      player = response.body;
    }, 5000);

    test('GET to /players to return an array of players', async () => {
      const response = await request(app).get('/api/players');
      expect(response.status).toEqual(200);
      expect(response).toHaveProperty('body');
      expect(response.body).not.toEqual([]);
      expect(response.body[0]).toHaveProperty('name');
      expect(response.body[0].name).toEqual('Nate Stinewasher');
    }, 5000);

    test('GET /players/:id returns player', async () => {
      const response = await request(app).get(`/api/players/${player._id}`);
      expect(response.status).toEqual(200);
      expect(response).toHaveProperty('body');
      expect(response.body.name).toEqual('Nate Stinewasher');
    }, 5000);

    test('PUT /player/:id updates players name', async () => {
      const response = await request(app).get(`/api/players/${player._id}`)
    }, 5000)
  });
});
