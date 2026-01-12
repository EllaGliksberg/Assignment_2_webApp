import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import User from '../models/User';

describe('User Controller Full Coverage', () => {
    let userId = "";

    beforeAll(async () => {
        await mongoose.connect(process.env.DB_URL_TEST || "mongodb://localhost:27017/ass2");
        await User.deleteMany();

        const user = await User.create({
            username: "TestUser",
            email: "test@example.com",
            password: "password123" 
        });
        userId = (user._id as any).toString();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('GET /users - should return 200 and all users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /users/:id - should return specific user', async () => {
        const res = await request(app).get(`/users/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(userId);
    });

    test('PUT /users/:id - should update user', async () => {
        const res = await request(app)
            .put(`/users/${userId}`)
            .send({ username: "UpdatedName" });

        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe("UpdatedName");
    });

    test('DELETE /users/:id - should delete user', async () => {
        const res = await request(app).delete(`/users/${userId}`);
        expect(res.statusCode).toBe(200);

        const checkRes = await request(app).get(`/users/${userId}`);
        expect(checkRes.statusCode).toBe(404);
    });
});