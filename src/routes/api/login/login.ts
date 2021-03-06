import express from 'express';

/** Middlewares */
import { RequestValidation } from '../../../middlewares/request-validation';

/** Controllers */
import { login } from '../../../route-services/auth/actions';

const _router = express.Router({ mergeParams: true });
const rv = new RequestValidation();

_router.post('/login', login);

export { _router as loginRouter };
