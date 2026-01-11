import { Router } from 'express';
import { addComment, getComments, updateComment, deleteComment } from '../controllers/comment.controller';

const router = Router();

router.post('/', addComment);
router.get('/', getComments);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;