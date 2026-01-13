import request from 'supertest';
import app from '../app';
import User from '../models/User';
import { connectTestDb, clearTestDb, closeTestDb } from './testDb';

describe('Auth - refresh & logout', () => {
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

  test('refresh rotates refresh tokens and returns new access token', async () => {
    const reg = await request(app).post('/api/auth/register').send({ username: 'ruser', email: 'ruser@example.com', password: 'pass123' });
    expect(reg.status).toBe(201);
    const oldRefresh = reg.body.refreshToken;
    expect(oldRefresh).toBeDefined();

    const res = await request(app).post('/api/auth/refresh').send({ refreshToken: oldRefresh });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');

    const user = await User.findOne({ email: 'ruser@example.com' });
    expect(user).not.toBeNull();
    const tokens = user?.refreshTokens || [];
    expect(tokens).toContain(res.body.refreshToken);
    expect(tokens).not.toContain(oldRefresh);
  });

  test('refresh with invalid token returns 401', async () => {
    const res = await request(app).post('/api/auth/refresh').send({ refreshToken: 'invalid-token' });
    expect(res.status).toBe(401);
  });

  test('logout revokes refresh token', async () => {
    const reg = await request(app).post('/api/auth/register').send({ username: 'luser', email: 'luser@example.com', password: 'pass123' });
    expect(reg.status).toBe(201);
    const refresh = reg.body.refreshToken;

    const res = await request(app).post('/api/auth/logout').send({ refreshToken: refresh });
    expect(res.status).toBe(200);

    const user = await User.findOne({ email: 'luser@example.com' });
    expect(user).not.toBeNull();
    const tokens = user?.refreshTokens || [];
    expect(tokens).not.toContain(refresh);
  });

  test('logout without token returns 400', async () => {
    const res = await request(app).post('/api/auth/logout').send({});
    expect(res.status).toBe(400);
  });
});
