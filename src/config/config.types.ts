export enum EEnv {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export type TConfig = {
  environment: EEnv;

  port: string;

  baseUrl: string;

  jwt: {
    key: string;
  },

  db: {
    uri: string;
  },
};
