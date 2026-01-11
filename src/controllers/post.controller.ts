import { Request, Response } from 'express';
import Post from '../models/Post';

// Get All Posts 
export const getPosts = async (req: Request, res: Response) => {
    try {
        const senderId = req.query.sender;
        let posts;

        if (senderId) {
            posts = await Post.find({ senderId: senderId });
        } else {
            posts = await Post.find();
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ message: "Error fetching posts", error });
    }
};

// Get Post by ID
export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: "Error fetching post", error });
    }
};

// Create Post
export const createPost = async (req: Request, res: Response) => {
    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: "Error creating post", error });
    }
};

// Update Post
export const updatePost = async (req: Request, res: Response) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedPost) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(400).json({ message: "Error updating post", error });
    }
};
// Delete Post
export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
};