import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contacts.js';

const PORT = Number(getEnvVar('PORT', '3000'));

export async function setupServer() {
  try {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(
      pino({
        transport: {
          target: 'pino-pretty',
        },
      }),
    );

    app.use('/contacts', contactsRouter);

    app.use((req, res) => {
      res.status(404).json({ message: 'Not found' });
    });

    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ status: 500, message: 'Something went wrong' });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
