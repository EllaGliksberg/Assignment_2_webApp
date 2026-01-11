import express from 'express';
import dotenv from "dotenv";
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import postRoutes from './routes/post.routes';
import commentRoutes from './routes/comment.routes';
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes);
app.use('/posts', postRoutes)

// global error handler
app.use(errorHandler);
app.get("/", (req, res) => {
    res.send("Hello World! Server is up and DB connection is initiated.");
});
export default app;
