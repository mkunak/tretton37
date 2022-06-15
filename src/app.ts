import express from 'express';
import cors from 'cors';
import 'express-async-errors';

/** Middlewares */
import { RouteHandling } from './middlewares/route-handling';

/** Routes */
import { routes } from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** Enable CORS */
app.use(cors());

RouteHandling.useAllRoutes(app, routes);

app.all('*', RouteHandling.handleNotFoundRoutes);

app.use(RouteHandling.handleErrors);

export { app };
