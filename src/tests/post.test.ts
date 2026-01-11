import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Post from '../models/Post';

describe('Post API Full Coverage', () => {
    let postId = "";
    const mockSenderId = new mongoose.Types.ObjectId().toString();

    beforeAll(async () => {
        await mongoose.connect(process.env.DB_URL_TEST || "mongodb://localhost:27017/ass2");
        await Post.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('POST /posts - Create Post', async () => {
        const res = await request(app).post('/posts').send({
            title: "Test Post",
            content: "Test Content",
            senderId: mockSenderId
        });
        expect(res.statusCode).toBe(201);
        postId = res.body._id;
    });

    test('GET /posts - Get All', async () => {
        const res = await request(app).get('/posts');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /posts/:id - Get by ID', async () => {
        const res = await request(app).get(`/posts/${postId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(postId);
    });

    test('GET /posts?sender=... - Filter by Sender', async () => {
        const res = await request(app).get(`/posts?sender=${mockSenderId}`);
        expect(res.statusCode).toBe(200);
    });

    test('PUT /posts/:id - Update Post', async () => {
        const res = await request(app).put(`/posts/${postId}`).send({ title: "Updated Title" });
        expect(res.statusCode).toBe(200);
    });

    test('DELETE /posts/:id - Delete Post', async () => {
        const res = await request(app).delete(`/posts/${postId}`);
        expect(res.statusCode).toBe(200);
    });
});