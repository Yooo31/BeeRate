import request from 'supertest';
import express from 'express';
import { initTestDB } from '../db';
import {
  getAllBeers,
  addBeer,
} from '../controllers/beerController';

const app = express();
app.use(express.json());

app.get('/beers', async (req, res) => await getAllBeers(req, res, await initTestDB()));
app.post('/beers', async (req, res) => await addBeer(req, res, await initTestDB()));

describe('Beer API', () => {
  let db;

  beforeAll(async () => {
    db = await initTestDB();
    await db.exec(`
      CREATE TABLE beers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        alcohol REAL NOT NULL,
        price REAL NOT NULL,
        rating REAL NOT NULL
      )
    `);
  });

  afterAll(async () => {
    await db.close();
  });

  it('should get an empty list of beers', async () => {
    const response = await request(app).get('/beers');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should add a beer and retrieve it', async () => {
    const newBeer = {
      name: 'IPA Bliss',
      alcohol: 6.5,
      price: 5,
      rating: 4.5,
    };

    const addResponse = await request(app).post('/beers').send(newBeer);
    expect(addResponse.status).toBe(201);

    const getResponse = await request(app).get('/beers');
    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveLength(1);
    expect(getResponse.body[0]).toMatchObject(newBeer);
  });
});
