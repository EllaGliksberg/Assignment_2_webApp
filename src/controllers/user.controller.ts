import { Request, Response } from 'express';

export async function getUser(req: Request, res: Response) {
  const { id } = req.params;
  res.json({ id, username: 'placeholder', email: 'user@example.com' });
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;
  res.json({ message: `User ${id} updated (placeholder)` });
}
