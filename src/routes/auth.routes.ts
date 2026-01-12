import { Router } from 'express';
import { login, register, refreshToken, logout } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);


export default router;
