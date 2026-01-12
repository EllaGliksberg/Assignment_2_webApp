import dotenv from 'dotenv';

export function loadEnv() {
  dotenv.config();
}

export const env = {
  port: process.env.PORT || '3000',
  dbUri: process.env.DB_URI || '',
  jwtSecret: process.env.JWT_SECRET || 'changeme',
  refreshSecret: process.env.REFRESH_SECRET || 'refresh-changeme',
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || '15m',
  refreshTokenExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d',
};
