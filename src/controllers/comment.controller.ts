import { Request, Response } from 'express';
import Comment from '../models/Comment';

export const addComment = async (req: Request, res: Response) => {
    try {
        const comment = await Comment.create(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: "Error adding comment", error });
    }
};

export const getComments = async (req: Request, res: Response) => {
    try {
        const { postId } = req.query;
        const filter = postId ? { postId } : {};
        const comments = await Comment.find(filter).populate('senderId', 'username');
        res.status(200).json(comments);
    } catch (error) {
        res.status(400).json({ message: "Error fetching comments", error });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    try {
        const updated = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Comment not found" });
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ message: "Error updating comment", error });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    try {
        const deleted = await Comment.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Comment not found" });
        res.status(200).json({ message: "Comment deleted" });
    } catch (error) {
        res.status(400).json({ message: "Error deleting comment", error });
    }
};