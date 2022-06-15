import { Express, Request, Response, NextFunction, Router } from 'express';

/** Errors */
import { CustomError, IResponseError, NotFoundError } from '../errors';

type TRoutes = {
  [version: string]: Router;
}

class RouteHandling {
  static generalReason = 'Something went wrong';

  static handleErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err instanceof CustomError) {
      return res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }

    if (err.message) console.error(err);

    const errors: IResponseError[] = [{ message: err.message || this.generalReason }];

    res.status(400).send({ errors });
  }

  static async handleNotFoundRoutes(req: Request, res: Response, next: NextFunction) {
    throw new NotFoundError();
    // return next(new NotFoundError());
  }

  static useAllRoutes(app: Express, routes: TRoutes): void {
    Object.keys(routes).forEach(route => {
      app.use(`/${route}`, routes[route]);
    });
  };
  
}

export { RouteHandling };
