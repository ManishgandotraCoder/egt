import { HttpException, HttpStatus } from '@nestjs/common';
import { messages } from './messages';

export const serverError = (error) => {
  throw new HttpException(
    {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: messages.SERVER_ERROR,
      error: error.message,
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );
};
export const validationError = (result) => {
  if (!result.isEmpty()) {
    throw new HttpException(
      {
        statusCode: HttpStatus.BAD_REQUEST,
        message: messages.VALIDATION_FAILED,
        errors: result.array(),
      },
      HttpStatus.BAD_REQUEST,
    );
  }
};
export const badRequestError = (message: string) => {
  throw new HttpException(
    {
      statusCode: HttpStatus.BAD_REQUEST,
      message: message,
    },
    HttpStatus.BAD_REQUEST,
  );
};

export const unauthorizedUserError = () => {
  throw new HttpException(
    {
      statusCode: HttpStatus.UNAUTHORIZED,
      message: messages.INVALID_CREDENTIALS,
    },
    HttpStatus.UNAUTHORIZED,
  );
};
