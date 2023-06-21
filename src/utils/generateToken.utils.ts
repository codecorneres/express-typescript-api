import jwt from 'jsonwebtoken';
import { User } from '../types/users';

const generateToken = (user: Partial<User>): string =>
  jwt.sign(user, process.env.JWT_SECRET || 'superSecret', { expiresIn: '2h' });

export default generateToken;