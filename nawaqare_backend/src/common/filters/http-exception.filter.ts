import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

interface ErrorDetail {
  field?: string;
  message: string;
  constraint?: string;
}

interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: ErrorDetail[];
    timestamp: string;
    path: string;
  };
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorCode = this.getErrorCode(status);
    const errorMessage = this.getErrorMessage(exception, exceptionResponse);
    const details = this.getErrorDetails(exception, exceptionResponse);

    const errorResponse: ErrorResponse = {
      error: {
        code: errorCode,
        message: errorMessage,
        ...(details && details.length > 0 && { details }),
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    };

    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${errorMessage}`,
      exception instanceof Error ? exception.stack : '',
    );

    response.status(status).json(errorResponse);
  }

  private getErrorCode(status: number): string {
    const codeMap: Record<number, string> = {
      400: 'BAD_REQUEST',
      401: 'UNAUTHORIZED',
      403: 'FORBIDDEN',
      404: 'NOT_FOUND',
      409: 'CONFLICT',
      422: 'UNPROCESSABLE_ENTITY',
      500: 'INTERNAL_SERVER_ERROR',
    };
    return codeMap[status] || 'ERROR';
  }

  private getErrorMessage(exception: HttpException, exceptionResponse: any): string {
    if (typeof exceptionResponse === 'string') {
      return exceptionResponse;
    }

    if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
      if (Array.isArray(exceptionResponse.message)) {
        return exceptionResponse.message[0] || exception.message;
      }
      return exceptionResponse.message;
    }

    return exception.message || 'An error occurred';
  }

  private getErrorDetails(_exception: HttpException, exceptionResponse: any): ErrorDetail[] {
    const details: ErrorDetail[] = [];

    if (typeof exceptionResponse === 'object' && exceptionResponse.message) {
      if (Array.isArray(exceptionResponse.message)) {
        return exceptionResponse.message.map((msg: any) => ({
          message: typeof msg === 'string' ? msg : msg.message || 'Validation error',
          ...(typeof msg === 'object' && msg.field && { field: msg.field }),
          ...(typeof msg === 'object' && msg.constraint && { constraint: msg.constraint }),
        }));
      }
    }

    return details;
  }
}
