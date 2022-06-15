import dotenv from 'dotenv';

import _c_ from './constants.json';
import { EEnv, TConfig } from './config.types';

dotenv.config();

const jwtKey = process.env.JWT_KEY || _c_.dev.jwtKey;

const dbUri = process.env.DB_URI || _c_.dev.dbUri;

const environment = (process.env.NODE_ENV as EEnv) || EEnv.DEVELOPMENT;

const port = process.env.PORT || _c_.dev.port;

const baseUrl = {
  development: 'https://backend-assignment.1337co.de/',
  production: 'https://backend-assignment.1337co.de/',
};

const config: TConfig = {
  environment,

  port,

  baseUrl: baseUrl[environment],

  jwt: {
    key: jwtKey,
  },

  db: {
    uri: dbUri,
  }
};

export { config }
