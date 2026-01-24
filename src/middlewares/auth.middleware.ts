import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../config/jwt';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = parts[1];
  try {
    const payload = verifyAccessToken(token);
    (req as any).user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
