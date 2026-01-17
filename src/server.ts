import app from './app';
import mongoose from 'mongoose';
import { loadEnv, env } from './config/env';

// load environment variables from .env
loadEnv();

const port = process.env.PORT || env.port || 3000;

// support either DB_URL or DB_URI (legacy/consistency)
const mongoUri = process.env.DB_URL || process.env.DB_URI || env.dbUri;
if (!mongoUri) {
    console.error('MongoDB connection error: no DB URL provided. Set DB_URL or DB_URI in your environment or .env');
    process.exit(1);
}

mongoose
    .connect(mongoUri)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });