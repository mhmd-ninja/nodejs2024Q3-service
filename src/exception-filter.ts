import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { LoggerService } from './logger';

@Catch(HttpException)
export class ExceptionFilter {
  private logger = new LoggerService('ExceptionFilter');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse =
      (exception.getResponse() as any).message || exception.getResponse();
    const errorMessage =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : exceptionResponse[0];

    // Log to file
    this.logger.error(errorMessage, exception.stack);

    response.status(status).send({
      statusCode: status,
      timestamp: new Date(),
      message: errorMessage,
    });
  }
}
