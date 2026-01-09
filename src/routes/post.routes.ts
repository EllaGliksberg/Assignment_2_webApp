import { Router } from 'express';
import { createPost, getPost, listPosts } from '../controllers/post.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', requireAuth, createPost);
router.get('/', listPosts);
router.get('/:id', getPost);

export default router;
