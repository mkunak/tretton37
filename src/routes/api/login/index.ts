import express from 'express';

import { loginRouter } from './login';

const _router = express.Router({ mergeParams: true });

_router.use(loginRouter);

export { _router as loginRouter };
