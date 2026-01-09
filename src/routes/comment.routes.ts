import { Router } from 'express';
import { addComment } from '../controllers/comment.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', requireAuth, addComment);

export default router;
