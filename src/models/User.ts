export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// TODO: replace with a Mongoose/TypeORM/Prisma model as needed
