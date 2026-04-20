import jwt from 'jsonwebtoken';

const DEFAULT_JWT_SECRET = 'local-development-secret-change-me';

export const getJwtSecret = () => process.env.JWT_SECRET?.trim() || DEFAULT_JWT_SECRET;

export const generateToken = (userId) => {
  return jwt.sign({ userId }, getJwtSecret(), {
    expiresIn: '7d',
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};
