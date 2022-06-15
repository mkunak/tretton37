import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/** Errors */
import { BadRequestError } from '../../../errors';

const login = async (req: Request, res: Response) => {
  const { username } = req.body;

  if (!username) throw new BadRequestError('Username is required');

  // generate user JWT
  const userJwt = jwt.sign({ username }, process.env.JWT_KEY!);

  res.status(201).send(userJwt);
};

export { login };
