import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Comment from '../models/Comment';
import { connectTestDb, clearTestDb, closeTestDb } from './testDb';

describe('Comment API Full Coverage', () => {
    let commentId = "";
    const mockPostId = new mongoose.Types.ObjectId().toString();

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

    test('POST /comments - Add comment', async () => {
        const res = await request(app).post('/api/comments').send({
            postId: mockPostId, senderId: new mongoose.Types.ObjectId().toString(), content: "Cool"
        });
        expect(res.statusCode).toBe(201);
        commentId = res.body._id;
    });

    test('GET /comments - Get all or by Post', async () => {
        const res = await request(app).get(`/api/comments?postId=${mockPostId}`);
        expect(res.statusCode).toBe(200);
    });

    test('PUT /comments/:id - Update comment', async () => {
        const res = await request(app).put(`/api/comments/${commentId}`).send({ content: "Updated" });
        expect(res.statusCode).toBe(200);
    });

    test('DELETE /comments/:id - Delete comment', async () => {
        const res = await request(app).delete(`/api/comments/${commentId}`);
        expect(res.statusCode).toBe(200);
    });
});