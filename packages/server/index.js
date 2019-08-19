import express from 'express';
import expressGraphQL from 'express-graphql';
import jwt from 'express-jwt';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv-safe';
import dbConfig from './database.json';
import schema from './graphql/schema';

dotenv.config();

const PORT = 4000;
const REQUEST_LIMIT = '10mb';
const config = dbConfig[process.env.NODE_ENV || 'development'];
const db = `mongodb://${config.host}:${config.port}/${config.database}`;
const app = express();

mongoose.connect(db, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => console.log('connected to mongo!'))
  .catch(error => console.log(error));

app.use(
  '/api',
  cors(),
  bodyParser.json({ limit: REQUEST_LIMIT }),
  jwt({
    secret: process.env.JWT_SECRET,
    credentialsRequired: false,
  }),
  expressGraphQL(async request => ({
    schema,
    context: {
      user: request.user,
    },
    customFormatErrorFn(error) {
      return {
        message: error.message,
        code: error.originalError && error.originalError.code,
        locations: error.locations,
        path: error.path,
      };
    },
  })),
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
