export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  content: string;
  createdAt?: Date;
}

// TODO: replace with a Mongoose/TypeORM/Prisma model as needed
