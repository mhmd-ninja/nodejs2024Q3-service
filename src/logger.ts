import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as rfs from 'rotating-file-stream';

export enum EnvironmentTypes {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

@Injectable()
export class LoggerService extends ConsoleLogger {
  private logStream: rfs.RotatingFileStream;
  private env = process.env.NODE_ENV as EnvironmentTypes;
  private isDebug: boolean;

  constructor(context: string) {
    super(context);

    this.isDebug = [EnvironmentTypes.PRODUCTION].includes(this.env);

    const logDir = path.join(__dirname, '..', 'logs');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    this.logStream = rfs.createStream(`${context}.log`, {
      size: '1MB',
      interval: '1d',
      path: logDir,
    });
  }

  log(message: string): void {
    super.log(message);
    this.writeLogToFile(`LOG [${this.context}]: ${message}`);
  }

  error(message: string, trace: string): void {
    if (this.isDebug) {
      this.writeLogToFile(
        `ERROR [${this.context}]: ${message}\nTrace: ${trace}`,
      );
      return;
    }
    super.error(message, trace);
  }

  warn(message: string): void {
    super.warn(message);
    this.writeLogToFile(`WARN [${this.context}]: ${message}`);
  }

  private writeLogToFile(logMessage: string) {
    const currentDateTime = new Date().toString();

    this.logStream.write(`${currentDateTime} - ${logMessage}\n`);
  }

  onModuleDestroy() {
    this.logStream.end();
  }
}
