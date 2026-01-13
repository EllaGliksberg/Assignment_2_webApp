import jwt from 'jsonwebtoken';
import { env } from './env';
import crypto from 'crypto';

// Small utility wrapper around jsonwebtoken. We use loose casts to keep the helpers short
// and avoid verbose generics across the codebase. The functions return strings for tokens
// and decoded payloads for verification.

export function signAccessToken(payload: object): string {
  return jwt.sign(payload as any, env.jwtSecret as any, { expiresIn: env.accessTokenExpiresIn as any });
}

export function signRefreshToken(payload: object): string {
  // add a small random "jti" field to ensure refresh tokens are unique even when signed
  const withJti = { ...(payload as any), jti: crypto.randomBytes(8).toString('hex') };
  return jwt.sign(withJti as any, env.refreshSecret as any, { expiresIn: env.refreshTokenExpiresIn as any });
}

export function verifyAccessToken(token: string): any {
  return jwt.verify(token, env.jwtSecret as any) as any;
}

export function verifyRefreshToken(token: string): any {
  return jwt.verify(token, env.refreshSecret as any) as any;
}
