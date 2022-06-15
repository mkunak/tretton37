import express from 'express';

import { loginRouter } from './login';
import { coworkersRouter } from './coworkers';

const _router = express.Router({ mergeParams: true });

_router.use(loginRouter);
_router.use(coworkersRouter);

export { _router as router };
