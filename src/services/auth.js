import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import crypto from 'node:crypto';
import { FIFTEEN_MINUTES, THIRTY_DAYS } from '../constants/index.js';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user !== null) {
    throw createHttpError(409, 'Email in use');
  }

  payload.password = await bcrypt.hash(payload.password, 10);

  return await User.create(payload);
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user === null) {
    throw createHttpError(401, 'Email or password is incorrect');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw createHttpError(401, 'Email or password is incorrect');
  }

  await Session.deleteOne({ userId: user._id });

  return Session.create({
    userId: user._id,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};

export const logoutUser = async (sessionId, refreshToken) => {
  await Session.deleteOne({ _id: sessionId, refreshToken });
};

export const refreshSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (session === null) {
    throw createHttpError(401, 'Session not found');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    throw createHttpError(401, 'Refresh token is expired');
  }

  await Session.deleteOne({
    _id: session._id,
    refreshToken: session.refreshToken,
  });

  return await Session.create({
    userId: session.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS),
  });
};
