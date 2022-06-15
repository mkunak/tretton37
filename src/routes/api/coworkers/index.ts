import express from 'express';

import { getCoworkersRouter } from './get-coworkers';
import { getCoworkerByIdRouter } from './get-coworker-by-id';
import { editCoworkerRouter } from './edit-coworker';

const _router = express.Router({ mergeParams: true });

_router.use(getCoworkersRouter);
_router.use(getCoworkerByIdRouter);
_router.use(editCoworkerRouter);

export { _router as coworkersRouter };
