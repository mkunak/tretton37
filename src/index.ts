/** App */
import { app } from './app';

/** Config */
import { config } from './config';

const startApp = async () => {
  if (!config.jwt.key) {
    throw new Error('JWT_KEY must be defined');
  }

  /** TODO: connect DB here */

  const PORT = config.port;
  app.listen(PORT, () => {
    console.log(`>>> Server is up and running on PORT ${PORT} ...`);
  });
};

startApp();
