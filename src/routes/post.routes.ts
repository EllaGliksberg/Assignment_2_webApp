import { Router } from 'express';
import { createPost, getPosts, getPostById, updatePost } from '../controllers/post.controller';

const router = Router();

router.post('/', createPost);          
router.get('/', getPosts);             
router.get('/:id', getPostById);       
router.put('/:id', updatePost);        

export default router;