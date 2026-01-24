import request from 'supertest';
import app from '../app';
import User from '../models/User';
import { connectTestDb, clearTestDb, closeTestDb } from './testDb';

describe('User Controller Full Coverage', () => {
    let userId = "";

    beforeAll(async () => {
        await connectTestDb();
    });

    afterAll(async () => {
        await clearTestDb();
        await closeTestDb();
    });

    beforeEach(async () => {
        await clearTestDb();
        const user = await User.create({
            username: "TestUser",
            email: "test@example.com",
            password: "password123"
        });
        userId = (user._id as any).toString();
    });

    test('GET /users - should return 200 and all users', async () => {
        const res = await request(app).get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /users/:id - should return specific user', async () => {
        const res = await request(app).get(`/api/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(userId);
    });

    test('PUT /users/:id - should update user', async () => {
        const res = await request(app)
            .put(`/api/users/${userId}`)
            .send({ username: "UpdatedName" });

        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe("UpdatedName");
    });

    test('DELETE /users/:id - should delete user', async () => {
        const res = await request(app).delete(`/api/users/${userId}`);
        expect(res.statusCode).toBe(200);

        const checkRes = await request(app).get(`/api/users/${userId}`);
        expect(checkRes.statusCode).toBe(404);
    });
});