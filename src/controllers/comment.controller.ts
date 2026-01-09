import { Request, Response } from 'express';

export async function addComment(req: Request, res: Response) {
  res.status(201).json({ message: 'Comment added (placeholder)' });
}
