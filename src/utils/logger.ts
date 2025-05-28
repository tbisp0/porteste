/**
 * Production-safe logging utility
 * Only logs in development mode to prevent console pollution in production
 */

interface Logger {
  log: (message: string, ...args: any[]) => void;
  info: (message: string, ...args: any[]) => void;
  warn: (message: string, ...args: any[]) => void;
  error: (message: string, ...args: any[]) => void;
  group: (label: string) => void;
  groupEnd: () => void;
  time: (label: string) => void;
  timeEnd: (label: string) => void;
}

const isDevelopment = import.meta.env.DEV;

export const logger: Logger = {
  log: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.log(message, ...args);
    }
  },

  info: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.info(message, ...args);
    }
  },

  warn: (message: string, ...args: any[]) => {
    if (isDevelopment) {
      console.warn(message, ...args);
    }
  },

  error: (message: string, ...args: any[]) => {
    // Errors should be logged in both development and production for debugging
    console.error(message, ...args);
  },

  group: (label: string) => {
    if (isDevelopment) {
      console.group(label);
    }
  },

  groupEnd: () => {
    if (isDevelopment) {
      console.groupEnd();
    }
  },

  time: (label: string) => {
    if (isDevelopment) {
      console.time(label);
    }
  },

  timeEnd: (label: string) => {
    if (isDevelopment) {
      console.timeEnd(label);
    }
  }
};

// Specific loggers for different modules
export const analyticsLogger = {
  init: (service: string) => logger.info(`✅ ${service} initialized successfully`),
  error: (service: string, error: any) => logger.error(`❌ ${service} error:`, error),
  event: (service: string, event: string) => logger.log(`📊 ${service} event:`, event),
};

export const i18nLogger = {
  init: (language: string) => logger.info(`🌐 i18n initialized with language: ${language}`),
  error: (error: any) => logger.error(`❌ i18n error:`, error),
  change: (language: string) => logger.log(`🔄 Language changed to: ${language}`),
};

export const performanceLogger = {
  vital: (name: string, value: number, rating: string) => {
    logger.group(`🔍 Web Vital: ${name}`);
    logger.log(`📊 Value: ${value.toFixed(2)}${name === 'CLS' ? '' : 'ms'}`);
    logger.log(`⭐ Rating: ${rating}`);
    logger.groupEnd();
  },
  error: (error: any) => logger.error(`⚡ Performance error:`, error),
};

export const themeLogger = {
  change: (theme: string) => logger.log(`🎨 Theme changed to: ${theme}`),
  error: (error: any) => logger.error(`🎨 Theme error:`, error),
};

export default logger;
