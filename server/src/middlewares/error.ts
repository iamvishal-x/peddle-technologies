import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError";
import HttpStatus from "http-status";
import { ValidationError } from "express-validation";

const errorConverter = (err: any, req: Request, res: Response, next: NextFunction): void => {
  let error = err;
  if (error instanceof ValidationError) {
    error = constructValidationError(error);
  } else if (!(error instanceof ApiError)) {
    error = constructOtherError(error);
  }
  next(error);
};

const errorHandler = (err: ApiError, req: Request, res: Response, next: NextFunction): void => {
  const { statusCode = HttpStatus.INTERNAL_SERVER_ERROR, message, stack } = err;

  const response = {
    success: false,
    code: statusCode,
    message,
    stack,
  };

  res.status(statusCode).send(response);
};

const constructValidationError = (error: ValidationError): ApiError => {
  const keyNames = Object.keys(error.details) as (keyof typeof error.details)[];
  let unifiedErrorMessage = `${error.message}: `;

  keyNames.forEach((name) => {
    const detail = error.details[name];
    if (detail) {
      unifiedErrorMessage += detail.map((er: { message: string }) => er.message).join(" and ");
    }
  });

  return new ApiError(HttpStatus.BAD_REQUEST, unifiedErrorMessage);
};

const constructOtherError = (error: any): ApiError => {
  let statusCode = error.statusCode || HttpStatus.BAD_REQUEST;
  let message = error.message || HttpStatus[statusCode as keyof typeof HttpStatus];

  if (error.name === "MongoServerError" && error.code === 11000) {
    statusCode = HttpStatus.BAD_REQUEST;
    message = "Already exists";
  }

  return new ApiError(statusCode, message, error.stack || "");
};

export { errorConverter, errorHandler };
