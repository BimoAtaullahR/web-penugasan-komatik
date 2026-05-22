export type ErrorDetail = {
  path: string;
  message: string;
};

export class AppError extends Error {
  statusCode: number;
  errors?: ErrorDetail[];

  constructor(message: string, statusCode = 500, errors?: ErrorDetail[]) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

export class ValidationError extends AppError {
  constructor(message: string, errors: ErrorDetail[]) {
    super(message, 400, errors);
  }
}
