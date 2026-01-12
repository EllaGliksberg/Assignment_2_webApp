import mongoose, { Schema, Model, Types } from 'mongoose';

export interface IPost {
    title: string;
    content: string;
    senderId: Types.ObjectId;
}

const postSchema = new Schema<IPost>({
    title: {
        type: String,
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

const Post = mongoose.model<IPost>('Post', postSchema as any);
export default Post;