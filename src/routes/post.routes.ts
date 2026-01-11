import { Router } from 'express';
import { createPost, getAllPosts } from '../controllers/post.controller';

const router = Router();

router.post('/', createPost);
router.get('/', getAllPosts);

export default router;