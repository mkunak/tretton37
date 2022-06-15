import express from 'express';

/** Middlewares */
import { Authentication } from '../../../middlewares/authentication';
import { RequestValidation } from '../../../middlewares/request-validation';

/** Controllers */
import { getCoworkerById } from '../../../route-services/coworkers/queries';

const _router = express.Router({ mergeParams: true });
const rv = new RequestValidation();

_router.get(
  '/coworker/:id',
  Authentication.verifyCurrentUser(),
  RequestValidation.parallel([rv.checkParamId()]),
  getCoworkerById
);

export { _router as getCoworkerByIdRouter };
