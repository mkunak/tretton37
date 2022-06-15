import express from 'express';

/** Middlewares */
import { Authentication } from '../../../middlewares/authentication';
import { RequestValidation } from '../../../middlewares/request-validation';

/** Controllers */
import { editCoworker } from '../../../route-services/coworkers/actions';

const _router = express.Router({ mergeParams: true });
const rv = new RequestValidation();

_router.post(
  '/coworker',
  Authentication.verifyCurrentUser(),
  RequestValidation.parallel([rv.checkBodyName(), rv.checkBodyId(), rv.checkBodyCity(), rv.checkBodyText()]),
  editCoworker
);

export { _router as editCoworkerRouter };
