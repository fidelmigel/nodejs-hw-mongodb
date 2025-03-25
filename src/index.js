import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  try {
    await initMongoConnection();
    console.log('Mongo connection successfully established!');
    setupServer();
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

bootstrap();
