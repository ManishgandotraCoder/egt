import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file'; // Import the module to extend winston

const { DailyRotateFile } = winston.transports; // Correctly access DailyRotateFile

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: 'logs/%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '14d', // Keep logs for 14 days
    }),
  ],
});

export class AppLogger implements LoggerService {
  log(message: string) {
    logger.info(message);
  }

  error(message: string, trace: string) {
    logger.error(message, trace);
  }

  warn(message: string) {
    logger.warn(message);
  }

  debug(message: string) {
    logger.debug(message);
  }

  verbose(message: string) {
    logger.verbose(message);
  }
}
