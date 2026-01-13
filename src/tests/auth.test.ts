import request from 'supertest';
import app from '../app';
import User from '../models/User';
import { connectTestDb, clearTestDb, closeTestDb } from './testDb';

describe('Auth (integration)', () => {
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

  describe('Register', () => {
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
      await request(app).post('/api/auth/register').send({ username: 'dupe', email: 'dupe@example.com', password: 'pass' });
      const res = await request(app).post('/api/auth/register').send({ username: 'dupe', email: 'dupe@example.com', password: 'pass' });
      expect(res.status).toBe(400);
    });
  });

  describe('Login', () => {
    test('successfully logs in with correct credentials', async () => {
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
      const res1 = await request(app).post('/api/auth/login').send({ email: 'noone@example.com', password: 'pass' });
      expect(res1.status).toBe(401);

      await request(app).post('/api/auth/register').send({ username: 'u2', email: 'u2@example.com', password: 'rightpass' });
      const res2 = await request(app).post('/api/auth/login').send({ email: 'u2@example.com', password: 'wrongpass' });
      expect(res2.status).toBe(401);
    });
  });

  describe('Refresh & Logout', () => {
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
});
describe('auth (placeholder)', () => {
  test('dummy', () => {
    expect(true).toBe(true);
  });
});
