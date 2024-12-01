import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FileLoggerService extends ConsoleLogger {
  private logStream: fs.WriteStream;

  // Accept the context parameter and pass it to the Logger constructor
  constructor(context: string) {
    super(context); // Set the context for the base Logger class

    const logDir = path.join(__dirname, '..', '..', 'logs');

    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const currentDate = new Date().toISOString().split('T')[0];

    // Open the log file in append mode
    this.logStream = fs.createWriteStream(
      path.join(logDir, `${currentDate}.log`),
      { flags: 'a' },
    );
  }

  log(message: string): void {
    // Log to console with the context
    super.log(message);
    this.writeLogToFile(`LOG [${this.context}]: ${message}`);
  }

  error(message: string, trace: string): void {
    // Log to console with the context
    this.writeLogToFile(`ERROR [${this.context}]: ${message}\nTrace: ${trace}`);
    super.error(message, trace);
  }

  warn(message: string): void {
    // Log to console with the context
    super.warn(message);
    this.writeLogToFile(`WARN [${this.context}]: ${message}`);
  }

  // Write log entries to the file
  private writeLogToFile(logMessage: string) {
    const currentDateTime = new Date().toString();

    this.logStream.write(`${currentDateTime} - ${logMessage}\n`);
  }

  // Close the file stream when the service is destroyed
  onModuleDestroy() {
    this.logStream.end();
  }
}
