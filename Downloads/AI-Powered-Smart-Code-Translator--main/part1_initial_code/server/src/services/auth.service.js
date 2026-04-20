import bcrypt from 'bcryptjs';
import User from '../models/User.model.js';
import { isDatabaseConnected } from '../config/db.config.js';
import { generateToken } from '../utils/jwt.utils.js';

const memoryUsers = new Map();

const normalizeEmail = (email = '') => email.trim().toLowerCase();
const normalizeUsername = (username = '') => username.trim();

const sanitizeUser = (user) => ({
  id: String(user._id || user.id),
  username: user.username,
  email: user.email,
});

const buildAuthResponse = (user, mode) => ({
  success: true,
  token: generateToken(user._id || user.id),
  user: sanitizeUser(user),
  mode,
});

const createError = (message, statusCode = 400) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

class AuthService {
  async register({ username, email, password }) {
    const normalizedEmail = normalizeEmail(email);
    const normalizedUsername = normalizeUsername(username);

    if (!normalizedUsername || !normalizedEmail || !password) {
      throw createError('Username, email, and password are required');
    }

    if (isDatabaseConnected()) {
      const existingUser = await User.findOne({
        $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
      });

      if (existingUser) {
        throw createError('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username: normalizedUsername,
        email: normalizedEmail,
        password: hashedPassword,
      });

      return buildAuthResponse(user, 'database');
    }

    const existingMemoryUser = Array.from(memoryUsers.values()).find(
      (user) => user.email === normalizedEmail || user.username === normalizedUsername
    );

    if (existingMemoryUser) {
      throw createError('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: `local-${Date.now()}-${memoryUsers.size + 1}`,
      username: normalizedUsername,
      email: normalizedEmail,
      password: hashedPassword,
    };

    memoryUsers.set(normalizedEmail, user);

    return buildAuthResponse(user, 'memory');
  }

  async login({ email, password }) {
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      throw createError('Email and password are required');
    }

    if (isDatabaseConnected()) {
      const user = await User.findOne({ email: normalizedEmail });

      if (!user) {
        throw createError('Invalid credentials');
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw createError('Invalid credentials');
      }

      return buildAuthResponse(user, 'database');
    }

    const user = memoryUsers.get(normalizedEmail);

    if (!user) {
      throw createError('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw createError('Invalid credentials');
    }

    return buildAuthResponse(user, 'memory');
  }
}

export default new AuthService();
