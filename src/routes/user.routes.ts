import { Router } from 'express';
import { getUser, updateUser } from '../controllers/user.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/:id', requireAuth, getUser);
router.put('/:id', requireAuth, updateUser);

export default router;
