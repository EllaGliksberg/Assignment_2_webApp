import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Comment from '../models/Comment';

describe('Comment API Full Coverage', () => {
    let commentId = "";
    const mockPostId = new mongoose.Types.ObjectId();

    beforeAll(async () => {
        await mongoose.connect(process.env.DB_URL_TEST || "mongodb://localhost:27017/ass2");
        await Comment.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('POST /comments - Add comment', async () => {
        const res = await request(app).post('/comments').send({
            postId: mockPostId, senderId: new mongoose.Types.ObjectId(), content: "Cool"
        });
        expect(res.statusCode).toBe(201);
        commentId = res.body._id;
    });

    test('GET /comments - Get all or by Post', async () => {
        const res = await request(app).get(`/comments?postId=${mockPostId}`);
        expect(res.statusCode).toBe(200);
    });

    test('PUT /comments/:id - Update comment', async () => {
        const res = await request(app).put(`/comments/${commentId}`).send({ content: "Updated" });
        expect(res.statusCode).toBe(200);
    });

    test('DELETE /comments/:id - Delete comment', async () => {
        const res = await request(app).delete(`/comments/${commentId}`);
        expect(res.statusCode).toBe(200);
    });
});