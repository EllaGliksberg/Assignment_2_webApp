import dotenv from 'dotenv';

export function loadEnv() {
  dotenv.config();
}

export const env = {
  port: process.env.PORT || '3000',
  dbUri: process.env.DB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'changeme',
};
