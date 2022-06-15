import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain, query, param } from 'express-validator';

/** Errors */
import { RequestValidationError } from '../errors';

// can be reused by many routes
class RequestValidation {
  // parallel processing
  static parallel(validations: ValidationChain[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      await Promise.all(validations.map(validation => validation.run(req)));

      const errors = validationResult(req);
      if (errors.isEmpty()) return next();

      next(new RequestValidationError(errors.array()));
    };
  };

  // sequential processing (stops running validations chain if the previous one have failed)
  static sequentially(validations: ValidationChain[]) {
    return async (req: Request, res: Response, next: NextFunction) => {
      for (let validation of validations) {
        const result = await validation.run(req);
        if (!result.isEmpty()) break;
      }

      const errors = validationResult(req);
      if (errors.isEmpty()) return next();

      next(new RequestValidationError(errors.array()));
    };
  };

  checkBodyName() {
    return body('name')
      .notEmpty()
      .withMessage('Name has to be valid');
  }

  checkBodyCity() {
    return body('city')
      .notEmpty()
      .withMessage('City has to be valid');
  }

  checkBodyText() {
    return body('text')
      .notEmpty()
      .withMessage('Text has to be valid');
  }

  checkBodyId() {
    return body('id')
      .notEmpty()
      .custom((input: string) => {
        return !isNaN(Number(input));
      })
      .withMessage('ID has to be valid');
  }

  checkQueryStart() {
    return query('start')
      .custom((input: string) => {
        if (input) {
          return !isNaN(Number(input));
        }
      })
      .withMessage('End has invalid value')
  }

  checkQueryEnd() {
    return query('end')
      .custom((input: string) => {
        if (input) {
          return !isNaN(Number(input));
        }
      })
      .withMessage('End has invalid value')
  }

  checkParamId() {
    return param('id')
      .custom((input: string) => {
        if (input) {
          return !isNaN(Number(input));
        }
      })
      .withMessage('ID has invalid value')
  }
}

export { RequestValidation };
