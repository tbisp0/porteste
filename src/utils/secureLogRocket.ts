/**
 * Secure LogRocket wrapper to prevent regex-based security vulnerabilities
 * Replaces vulnerable hostname validation with secure alternatives
 */

import { SecureValidation } from './secureValidation';

// Type definitions for LogRocket
interface LogRocketConfig {
  shouldAugmentNPS?: boolean;
  shouldParseXHRBlob?: boolean;
  network?: {
    isEnabled?: boolean;
  };
}

interface LogRocketInstance {
  init: (appId: string, config?: LogRocketConfig) => void;
  identify: (userId: string, userInfo?: Record<string, any>) => void;
  track: (eventName: string, properties?: Record<string, any>) => void;
  getSessionURL: (callback: (url: string) => void) => void;
  captureMessage: (message: string, extra?: Record<string, any>) => void;
  captureException: (error: Error, extra?: Record<string, any>) => void;
  [key: string]: any;
}

/**
 * Secure URL interceptor for analytics requests
 * Prevents vulnerable regex patterns from being exploited
 */
class SecureAnalyticsInterceptor {
  private originalXMLHttpRequest: typeof XMLHttpRequest;
  private originalFetch: typeof fetch;

  constructor() {
    this.originalXMLHttpRequest = window.XMLHttpRequest;
    this.originalFetch = window.fetch;
  }

  /**
   * Install secure interceptors
   */
  install(): void {
    this.interceptXMLHttpRequest();
    this.interceptFetch();
  }

  /**
   * Uninstall interceptors and restore original functions
   */
  uninstall(): void {
    if (this.originalXMLHttpRequest) {
      window.XMLHttpRequest = this.originalXMLHttpRequest;
    }
    if (this.originalFetch) {
      window.fetch = this.originalFetch;
    }
  }

  /**
   * Secure XMLHttpRequest interceptor
   */
  private interceptXMLHttpRequest(): void {
    const originalXHR = this.originalXMLHttpRequest;
    const secureValidation = SecureValidation;

    window.XMLHttpRequest = function(...args: any[]) {
      const xhr = new originalXHR(...args);
      const originalOpen = xhr.open;

      xhr.open = function(method: string, url: string, ...rest: any[]) {
        // Validate URL using secure methods instead of regex
        if (typeof url === 'string') {
          try {
            // Check if it's an analytics URL that needs special handling
            if (secureValidation.matchesAnalyticsPattern(url, 'wootric')) {
              // Secure handling for Wootric URLs
              if (!secureValidation.validateAnalyticsUrl(url)) {
                console.warn('SecureLogRocket: Blocked potentially unsafe Wootric URL:', url);
                return;
              }
            } else if (secureValidation.matchesAnalyticsPattern(url, 'delighted')) {
              // Secure handling for Delighted URLs
              if (!secureValidation.validateAnalyticsUrl(url)) {
                console.warn('SecureLogRocket: Blocked potentially unsafe Delighted URL:', url);
                return;
              }
            } else if (secureValidation.matchesAnalyticsPattern(url, 'logrocket')) {
              // Secure handling for LogRocket URLs
              if (!secureValidation.validateAnalyticsUrl(url)) {
                console.warn('SecureLogRocket: Blocked potentially unsafe LogRocket URL:', url);
                return;
              }
            }
          } catch (error) {
            console.warn('SecureLogRocket: Error validating URL:', error);
            return;
          }
        }

        return originalOpen.call(this, method, url, ...rest);
      };

      return xhr;
    };

    // Copy static properties
    Object.setPrototypeOf(window.XMLHttpRequest, originalXHR);
    Object.defineProperty(window.XMLHttpRequest, 'prototype', {
      value: originalXHR.prototype,
      writable: false
    });
  }

  /**
   * Secure fetch interceptor
   */
  private interceptFetch(): void {
    const originalFetch = this.originalFetch;
    const secureValidation = SecureValidation;

    window.fetch = function(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
      let url: string;

      try {
        if (typeof input === 'string') {
          url = input;
        } else if (input instanceof URL) {
          url = input.href;
        } else if (input instanceof Request) {
          url = input.url;
        } else {
          url = String(input);
        }

        // Validate analytics URLs securely
        if (secureValidation.matchesAnalyticsPattern(url, 'wootric') ||
            secureValidation.matchesAnalyticsPattern(url, 'delighted') ||
            secureValidation.matchesAnalyticsPattern(url, 'logrocket')) {

          if (!secureValidation.validateAnalyticsUrl(url)) {
            console.warn('SecureLogRocket: Blocked potentially unsafe analytics URL:', url);
            return Promise.reject(new Error('URL validation failed'));
          }
        }
      } catch (error) {
        console.warn('SecureLogRocket: Error validating fetch URL:', error);
      }

      return originalFetch.call(this, input, init);
    };
  }
}

/**
 * Secure LogRocket wrapper class
 */
class SecureLogRocket {
  private logRocket: LogRocketInstance | null = null;
  private interceptor: SecureAnalyticsInterceptor;
  private isInitialized = false;

  constructor() {
    this.interceptor = new SecureAnalyticsInterceptor();
  }

  /**
   * Initialize LogRocket with secure interceptors
   */
  async init(appId: string, config: LogRocketConfig = {}): Promise<void> {
    if (this.isInitialized) {
      console.warn('SecureLogRocket: Already initialized');
      return;
    }

    try {
      // Install security interceptors before LogRocket initialization
      this.interceptor.install();

      // Prevent deprecated unload event listeners
      this.preventDeprecatedEventListeners();

      // Dynamically import LogRocket to ensure interceptors are in place
      const LogRocket = await import('logrocket');
      this.logRocket = LogRocket.default;

      // Initialize with secure configuration
      const secureConfig: LogRocketConfig = {
        shouldAugmentNPS: false, // Disable NPS augmentation to prevent regex issues
        shouldParseXHRBlob: false, // Disable blob parsing for security
        network: {
          isEnabled: true
        },
        ...config
      };

      this.logRocket.init(appId, secureConfig);
      this.isInitialized = true;

      console.log('SecureLogRocket: Initialized successfully with security enhancements');
    } catch (error) {
      console.error('SecureLogRocket: Failed to initialize:', error);
      this.interceptor.uninstall();
      throw error;
    }
  }

  /**
   * Safely identify user
   */
  identify(userId: string, userInfo?: Record<string, any>): void {
    if (!this.logRocket) {
      console.warn('SecureLogRocket: Not initialized');
      return;
    }

    try {
      // Sanitize user info to prevent injection
      const sanitizedUserInfo = userInfo ? this.sanitizeUserInfo(userInfo) : undefined;
      this.logRocket.identify(userId, sanitizedUserInfo);
    } catch (error) {
      console.error('SecureLogRocket: Error identifying user:', error);
    }
  }

  /**
   * Safely track events
   */
  track(eventName: string, properties?: Record<string, any>): void {
    if (!this.logRocket) {
      console.warn('SecureLogRocket: Not initialized');
      return;
    }

    try {
      // Sanitize event properties
      const sanitizedProperties = properties ? this.sanitizeUserInfo(properties) : undefined;
      this.logRocket.track(eventName, sanitizedProperties);
    } catch (error) {
      console.error('SecureLogRocket: Error tracking event:', error);
    }
  }

  /**
   * Get session URL safely
   */
  getSessionURL(callback: (url: string) => void): void {
    if (!this.logRocket) {
      console.warn('SecureLogRocket: Not initialized');
      callback('');
      return;
    }

    try {
      this.logRocket.getSessionURL((url: string) => {
        // More lenient validation for LogRocket session URLs
        if (url && typeof url === 'string' && url.length > 0) {
          try {
            const parsedUrl = new URL(url);
            // Allow LogRocket domains and app.logrocket.com
            if (parsedUrl.hostname.includes('logrocket.com') ||
                parsedUrl.hostname.includes('logrocket.io')) {
              callback(url);
            } else {
              console.warn('SecureLogRocket: Invalid session URL domain:', parsedUrl.hostname);
              callback('');
            }
          } catch (urlError) {
            console.warn('SecureLogRocket: Invalid session URL format:', url);
            callback('');
          }
        } else {
          console.warn('SecureLogRocket: Empty or invalid session URL received');
          callback('');
        }
      });
    } catch (error) {
      console.error('SecureLogRocket: Error getting session URL:', error);
      callback('');
    }
  }

  /**
   * Safely capture messages
   */
  captureMessage(message: string, extra?: Record<string, any>): void {
    if (!this.logRocket) {
      console.warn('SecureLogRocket: Not initialized');
      return;
    }

    try {
      const sanitizedMessage = SecureValidation.sanitizeString(message);
      const sanitizedExtra = extra ? this.sanitizeUserInfo(extra) : undefined;
      this.logRocket.captureMessage(sanitizedMessage, sanitizedExtra);
    } catch (error) {
      console.error('SecureLogRocket: Error capturing message:', error);
    }
  }

  /**
   * Safely capture exceptions
   */
  captureException(error: Error, extra?: Record<string, any>): void {
    if (!this.logRocket) {
      console.warn('SecureLogRocket: Not initialized');
      return;
    }

    try {
      const sanitizedExtra = extra ? this.sanitizeUserInfo(extra) : undefined;
      this.logRocket.captureException(error, sanitizedExtra);
    } catch (captureError) {
      console.error('SecureLogRocket: Error capturing exception:', captureError);
    }
  }

  /**
   * Prevent deprecated unload event listeners
   */
  private preventDeprecatedEventListeners(): void {
    // Only apply in production to avoid interfering with development
    if (!import.meta.env.PROD) {
      return;
    }

    // Override deprecated event listener methods to use modern alternatives
    const originalAddEventListener = window.addEventListener;

    window.addEventListener = function(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
      // Replace deprecated unload events with modern alternatives
      if (type === 'unload') {
        console.warn('SecureLogRocket: Replacing deprecated "unload" event with "pagehide"');
        return originalAddEventListener.call(this, 'pagehide', listener, options);
      } else if (type === 'beforeunload') {
        // Keep beforeunload but add warning
        console.warn('SecureLogRocket: "beforeunload" event should be used sparingly');
        return originalAddEventListener.call(this, type, listener, options);
      }

      return originalAddEventListener.call(this, type, listener, options);
    };
  }

  /**
   * Uninstall and cleanup
   */
  uninstall(): void {
    try {
      if (this.logRocket && typeof this.logRocket.uninstall === 'function') {
        this.logRocket.uninstall();
      }
      this.interceptor.uninstall();
      this.logRocket = null;
      this.isInitialized = false;
      console.log('SecureLogRocket: Uninstalled successfully');
    } catch (error) {
      console.error('SecureLogRocket: Error during uninstall:', error);
    }
  }

  /**
   * Sanitize user info to prevent injection attacks
   */
  private sanitizeUserInfo(info: Record<string, any>): Record<string, any> {
    const sanitized: Record<string, any> = {};

    for (const [key, value] of Object.entries(info)) {
      const sanitizedKey = SecureValidation.sanitizeString(String(key));

      if (typeof value === 'string') {
        sanitized[sanitizedKey] = SecureValidation.sanitizeString(value);
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        sanitized[sanitizedKey] = value;
      } else if (value === null || value === undefined) {
        sanitized[sanitizedKey] = value;
      } else {
        // For complex objects, convert to string and sanitize
        sanitized[sanitizedKey] = SecureValidation.sanitizeString(JSON.stringify(value));
      }
    }

    return sanitized;
  }

  /**
   * Check if LogRocket is initialized
   */
  get isReady(): boolean {
    return this.isInitialized && this.logRocket !== null;
  }

  /**
   * Get the underlying LogRocket instance (use with caution)
   */
  get instance(): LogRocketInstance | null {
    return this.logRocket;
  }
}

// Create and export singleton instance
export const secureLogRocket = new SecureLogRocket();
export default secureLogRocket;
