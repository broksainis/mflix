import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { config } from './config/config';
// routes
import movieRoutes from './routes/Movie';

const APP: Express = express();

mongoose.connect(config.mongo.url)
    .then(() => {
        console.log('Connected.');
        runServerRouters();
    })
    .catch((error: Error) => {
        console.error(error.message);
    });

const runServerRouters = () => {
  APP.use(express.urlencoded({ extended: true }));
  APP.use(express.json());

  APP.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

  APP.use('/movies', movieRoutes);

  /** Error handling */
  APP.use((req, res, next) => {
    const error = new Error('Data not found!');
    res.status(404).json({
        message: error.message
    });
  });
};

APP.listen(config.server.port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${config.server.port}`);
});
