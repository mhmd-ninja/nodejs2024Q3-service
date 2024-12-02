import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionFilter } from './exception-filter';
import { LoggerService } from './logger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new LoggerService('NestApplication');

  // Handle uncaught exceptions
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception', err.stack);
    // Optionally exit the process
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason: any) => {
    logger.error('Unhandled Rejection', JSON.stringify(reason));
    // Optionally exit the process
    process.exit(1);
  });

  app.useGlobalPipes(
    new ValidationPipe({ transform: true, stopAtFirstError: true }),
  );

  app.useGlobalFilters(new ExceptionFilter());
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
