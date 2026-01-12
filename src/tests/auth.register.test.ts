import request from 'supertest';
import app from '../app';
import User from '../models/User';
import { connectTestDb, clearTestDb, closeTestDb } from './testDb';

describe('Auth - register', () => {
  beforeAll(async () => {
    await connectTestDb();
  });

  afterAll(async () => {
    await clearTestDb();
    await closeTestDb();
  });

  beforeEach(async () => {
    await clearTestDb();
  });

  test('successfully registers a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({ username: 'u1', email: 'u1@example.com', password: 'pass123' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');

    const user = await User.findOne({ email: 'u1@example.com' });
    expect(user).not.toBeNull();
    expect(user?.username).toBe('u1');
  });

  test('missing fields returns 400', async () => {
    const res = await request(app).post('/api/auth/register').send({ email: 'u2@example.com' });
    expect(res.status).toBe(400);
  });

  test('duplicate user returns 400', async () => {
    // create existing user
    await request(app).post('/api/auth/register').send({ username: 'dupe', email: 'dupe@example.com', password: 'pass' });
    const res = await request(app).post('/api/auth/register').send({ username: 'dupe', email: 'dupe@example.com', password: 'pass' });
    expect(res.status).toBe(400);
  });
});
