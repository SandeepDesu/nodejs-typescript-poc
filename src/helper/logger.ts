import { logger } from './log4j';

class Logger {
  error(error) {
    logger.error(error);
  }

  info(info) {
    logger.info(info);
  }
}

export default new Logger();
