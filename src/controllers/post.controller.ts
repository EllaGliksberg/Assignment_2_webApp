import { Request, Response } from 'express';
import Post from '../models/Post';

export const createPost = async (req: Request, res: Response) => {
    const { title, content, senderId } = req.body;
    try {
        const newPost = await Post.create({ title, content, senderId });
        res.status(201).json(newPost);
    } catch (error) {
        res.status(400).json({ message: "Error creating post", error });
    }
};

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await Post.find().populate('senderId', 'username email');
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: "Error fetching posts", error });
    }
};