import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

export const setupServer = () => {
  dotenv.config();

  const app = express();

  app.use(pino());
  app.use(cors());
  app.use(express.json());

  // Define routes here
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
