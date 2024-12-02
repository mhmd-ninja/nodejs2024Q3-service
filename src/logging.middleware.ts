import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from './logger';
import { NextFunction, Response, Request } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private logger = new LoggerService('LoggingMiddleware');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, query, body } = req;
    const start = Date.now();

    this.logger.log(
      `Incoming Request: ${method} ${originalUrl}, Query: ${JSON.stringify(
        query,
      )}, Body: ${JSON.stringify(body)}`,
    );

    res.on('finish', () => {
      const { statusCode } = res;
      const duration = Date.now() - start;
      this.logger.log(
        `Response: ${method} ${originalUrl}, Status: ${statusCode}, Duration: ${duration}ms`,
      );
    });

    next();
  }
}
