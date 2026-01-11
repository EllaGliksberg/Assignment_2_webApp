import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IComment {
    postId: Types.ObjectId;
    content: string;
    senderId: Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const Comment = mongoose.models.Comment || mongoose.model<IComment>('Comment', commentSchema as any);

export default Comment;