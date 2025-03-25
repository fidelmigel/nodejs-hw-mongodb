import mongoose from 'mongoose';
import { getEnvVar } from '../utils/getEnvVar.js';

export function initMongoConnection() {
  const MONGODB_USER = getEnvVar('MONGODB_USER');
  const MONGODB_PASSWORD = encodeURIComponent(getEnvVar('MONGODB_PASSWORD'));
  const MONGODB_URL = getEnvVar('MONGODB_URL');
  const MONGODB_DB = getEnvVar('MONGODB_DB');

  return mongoose.connect(
    `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`,
  );
}
