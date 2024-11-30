import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET não definido no arquivo .env');
}

export const JWT_SECRET = process.env.JWT_SECRET;
