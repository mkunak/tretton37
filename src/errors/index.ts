import { ValidationError } from 'express-validator';

export interface IResponseError {
  message: string
  field?: string
};

// Abstract Fabric pattern
export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    // Only because we are extending a build in class
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): IResponseError[];
}

export class RequestValidationError extends CustomError {
  statusCode = 400;
  public errors: ValidationError[];

  constructor(errors: ValidationError[]) {
    super('Invalid request parameters');
    this.errors = errors;

    // Only because we are extending a build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): IResponseError[] {
    return this.errors.map(({ msg, param }) => {
      return { message: msg, field: param };
    });
  }
}

export class NotFoundError extends CustomError {
  statusCode = 404;
  reason = 'Not found';

  constructor() {
    super('Route not found');

    // Only because we are extending a build in class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors(): IResponseError[] {
    return [{ message: this.reason }];
  }
}

export class BadRequestError extends CustomError {
  statusCode = 400;
  reason: string;

  constructor(reason: string) {
    super(reason);

    this.reason = reason;

    // Only because we are extending a build in class
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): IResponseError[] {
    return [{ message: this.reason }];
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = 401;
  reason = 'Not authorized';

  constructor() {
    super('Not authorized');

    // Only because we are extending a build in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors(): IResponseError[] {
    return [{ message: this.reason }];
  }
}
