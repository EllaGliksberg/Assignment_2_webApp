import request from 'supertest';
import app from '../app';
import User from '../models/User';
import { connectTestDb, clearTestDb, closeTestDb } from './testDb';

describe('Auth - login', () => {
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

  test('successfully logs in with correct credentials', async () => {
    // register first
    await request(app).post('/api/auth/register').send({ username: 'loginuser', email: 'login@example.com', password: 'mypassword' });

    const res = await request(app).post('/api/auth/login').send({ email: 'login@example.com', password: 'mypassword' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');

    const user = await User.findOne({ email: 'login@example.com' });
    expect(user).not.toBeNull();
  });

  test('missing fields returns 400', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'x@example.com' });
    expect(res.status).toBe(400);
  });

  test('invalid credentials returns 401', async () => {
    // user does not exist
    const res1 = await request(app).post('/api/auth/login').send({ email: 'noone@example.com', password: 'pass' });
    expect(res1.status).toBe(401);

    // wrong password
    await request(app).post('/api/auth/register').send({ username: 'u2', email: 'u2@example.com', password: 'rightpass' });
    const res2 = await request(app).post('/api/auth/login').send({ email: 'u2@example.com', password: 'wrongpass' });
    expect(res2.status).toBe(401);
  });
});
