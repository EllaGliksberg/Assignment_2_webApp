import { Request, Response } from 'express';

export async function createPost(req: Request, res: Response) {
  res.status(201).json({ message: 'Post created (placeholder)' });
}

export async function getPost(req: Request, res: Response) {
  const { id } = req.params;
  res.json({ id, title: 'Sample post', content: 'This is a placeholder post.' });
}

export async function listPosts(req: Request, res: Response) {
  res.json([{ id: '1', title: 'First post', content: '...' }]);
}
