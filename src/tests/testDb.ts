import mongoose from 'mongoose';

const TEST_DB_URI = process.env.TEST_DB_URI || '';

export async function connectTestDb() {
  if (!TEST_DB_URI) {
    throw new Error('TEST_DB_URI environment variable is not set. Set it to your MongoDB test database URI.');
  }
  await mongoose.connect(TEST_DB_URI, { dbName: undefined });
}

export async function clearTestDb() {
  const collections = Object.keys(mongoose.connection.collections);
  for (const name of collections) {
    const collection = mongoose.connection.collections[name];
    try {
      await collection.deleteMany({});
    } catch (err) {
      // ignore
    }
  }
}

export async function closeTestDb() {
  await mongoose.connection.dropDatabase().catch(() => {});
  await mongoose.connection.close();
}
