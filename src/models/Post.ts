export interface Post {
  id: string;
  authorId: string;
  title: string;
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// TODO: replace with a Mongoose/TypeORM/Prisma model as needed
