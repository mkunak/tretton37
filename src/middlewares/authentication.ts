import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

/** Config */
import { config } from '../config';

/** Errors */
import { NotAuthorizedError } from '../errors';

interface IUserPayload {
  username: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: IUserPayload;
    }
  }
}

// can be reused by many routes
class Authentication {
  static verifyCurrentUser() {
    return (req: Request, res: Response, next: NextFunction) => {
      /** Get jwt token from headers */
      const authHeader = req.headers['authorization'];
      if (!authHeader) throw new NotAuthorizedError();

      const token = authHeader.split('Bearer')[1].trim();
      if (!token) throw new NotAuthorizedError();

      try {
        const jwtPayload = jwt.verify(token, config.jwt.key) as IUserPayload;

        req.currentUser = jwtPayload;

        next();
      } catch (err) {
        next();
      }
    }
  }
}

export { Authentication };
