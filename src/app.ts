import express from 'express';
import bodyParser from 'body-parser';
import { json } from 'body-parser';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// global error handler
app.use(errorHandler);

export default app;
