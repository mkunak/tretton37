import express from 'express';

/** Middlewares */
import { Authentication } from '../../../middlewares/authentication';
import { RequestValidation } from '../../../middlewares/request-validation';

/** Controllers */
import { getCoworkers } from '../../../route-services/coworkers/queries';

const _router = express.Router({ mergeParams: true });
const rv = new RequestValidation();

_router.get(
  '/coworkers',
  Authentication.verifyCurrentUser(),
  RequestValidation.parallel([rv.checkQueryEnd(), rv.checkQueryStart()]),
  getCoworkers
);

export { _router as getCoworkersRouter };
