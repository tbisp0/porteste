/**
 * Content Security Policy (CSP) Security Utilities
 * Prevents eval() usage and implements secure alternatives
 */

/**
 * Secure alternatives to eval() and Function constructor
 */
export class CSPSecurity {
  /**
   * Secure JSON parsing without eval()
   */
  static parseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('CSPSecurity: Invalid JSON string:', error);
      return null;
    }
  }

  /**
   * Secure template string replacement without eval()
   */
  static interpolateTemplate(template: string, variables: Record<string, any>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return variables[key] !== undefined ? String(variables[key]) : match;
    });
  }

  /**
   * Secure dynamic property access without eval()
   */
  static getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }

  /**
   * Secure dynamic property setting without eval()
   */
  static setNestedProperty(obj: any, path: string, value: any): void {
    const keys = path.split('.');
    const lastKey = keys.pop();

    if (!lastKey) return;

    const target = keys.reduce((current, key) => {
      if (!current[key] || typeof current[key] !== 'object') {
        current[key] = {};
      }
      return current[key];
    }, obj);

    target[lastKey] = value;
  }

  /**
   * Secure script execution without eval()
   * Only allows predefined safe operations
   */
  static executeSafeOperation(operation: string, context: Record<string, any>): any {
    const safeOperations: Record<string, Function> = {
      'add': (a: number, b: number) => a + b,
      'subtract': (a: number, b: number) => a - b,
      'multiply': (a: number, b: number) => a * b,
      'divide': (a: number, b: number) => b !== 0 ? a / b : 0,
      'concat': (a: string, b: string) => a + b,
      'uppercase': (str: string) => str.toUpperCase(),
      'lowercase': (str: string) => str.toLowerCase(),
      'length': (arr: any[]) => arr.length,
      'reverse': (arr: any[]) => [...arr].reverse(),
      'sort': (arr: any[]) => [...arr].sort()
    };

    if (safeOperations[operation]) {
      return safeOperations[operation];
    }

    console.warn('CSPSecurity: Unsafe operation blocked:', operation);
    return null;
  }

  /**
   * Secure timeout/interval without string evaluation
   */
  static secureSetTimeout(callback: Function, delay: number): number {
    if (typeof callback !== 'function') {
      console.error('CSPSecurity: setTimeout callback must be a function');
      return 0;
    }
    return window.setTimeout(callback, delay);
  }

  static secureSetInterval(callback: Function, delay: number): number {
    if (typeof callback !== 'function') {
      console.error('CSPSecurity: setInterval callback must be a function');
      return 0;
    }
    return window.setInterval(callback, delay);
  }

  /**
   * Secure dynamic import without eval()
   */
  static async secureImport(modulePath: string): Promise<any> {
    // Validate module path to prevent injection
    if (!this.isValidModulePath(modulePath)) {
      throw new Error('CSPSecurity: Invalid module path');
    }

    try {
      return await import(/* @vite-ignore */ modulePath);
    } catch (error) {
      console.error('CSPSecurity: Failed to import module:', modulePath, error);
      throw error;
    }
  }

  /**
   * Validate module path for security
   */
  private static isValidModulePath(path: string): boolean {
    // Allow only relative paths and npm packages
    const validPatterns = [
      /^\.\//, // Relative paths starting with ./
      /^\.\.\//, // Relative paths starting with ../
      /^@?[a-zA-Z0-9_-]+\/[a-zA-Z0-9_/-]+$/, // npm packages
      /^[a-zA-Z0-9_-]+$/ // Simple package names
    ];

    return validPatterns.some(pattern => pattern.test(path));
  }

  /**
   * Secure HTML sanitization without eval()
   */
  static sanitizeHTML(html: string): string {
    const div = document.createElement('div');
    div.textContent = html;
    return div.innerHTML;
  }

  /**
   * Secure URL construction without eval()
   */
  static buildSecureURL(base: string, params: Record<string, string>): string {
    try {
      const url = new URL(base);

      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });

      return url.toString();
    } catch (error) {
      console.error('CSPSecurity: Invalid URL construction:', error);
      return base;
    }
  }

  /**
   * Install CSP security interceptors
   */
  static installCSPInterceptors(): void {
    // Intercept and warn about eval() usage (non-blocking in development)
    if (typeof window !== 'undefined') {
      const originalEval = window.eval;

      window.eval = function(code: string) {
        if (import.meta.env.DEV) {
          console.warn('CSPSecurity: eval() usage detected. Consider using secure alternatives.');
          return originalEval.call(this, code);
        } else {
          console.error('CSPSecurity: eval() usage blocked for security. Use secure alternatives.');
          throw new Error('eval() is not allowed due to Content Security Policy');
        }
      };

      // Intercept Function constructor (warn in dev, block in prod)
      const originalFunction = window.Function;

      window.Function = function(...args: any[]) {
        if (import.meta.env.DEV) {
          console.warn('CSPSecurity: Function constructor usage detected. Consider using secure alternatives.');
          return originalFunction.apply(this, args);
        } else {
          console.error('CSPSecurity: Function constructor blocked for security.');
          throw new Error('Function constructor is not allowed due to Content Security Policy');
        }
      } as any;

      // Intercept setTimeout/setInterval with string arguments
      const originalSetTimeout = window.setTimeout;
      const originalSetInterval = window.setInterval;

      window.setTimeout = function(handler: any, timeout?: number, ...args: any[]): number {
        if (typeof handler === 'string') {
          if (import.meta.env.DEV) {
            console.warn('CSPSecurity: setTimeout with string detected. Consider using function instead.');
            return originalSetTimeout.call(this, handler, timeout, ...args);
          } else {
            console.error('CSPSecurity: setTimeout with string blocked. Use function instead.');
            throw new Error('setTimeout with string is not allowed due to Content Security Policy');
          }
        }
        return originalSetTimeout.call(this, handler, timeout, ...args);
      };

      window.setInterval = function(handler: any, timeout?: number, ...args: any[]): number {
        if (typeof handler === 'string') {
          if (import.meta.env.DEV) {
            console.warn('CSPSecurity: setInterval with string detected. Consider using function instead.');
            return originalSetInterval.call(this, handler, timeout, ...args);
          } else {
            console.error('CSPSecurity: setInterval with string blocked. Use function instead.');
            throw new Error('setInterval with string is not allowed due to Content Security Policy');
          }
        }
        return originalSetInterval.call(this, handler, timeout, ...args);
      };

      console.log('CSPSecurity: Security interceptors installed successfully');
    }
  }

  /**
   * Generate CSP nonce for inline scripts
   */
  static generateNonce(): string {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array));
  }

  /**
   * Validate CSP compliance
   */
  static validateCSPCompliance(): boolean {
    const violations: string[] = [];

    // Check if our interceptors are in place
    if (typeof window !== 'undefined') {
      // Check if eval is properly intercepted
      const evalString = window.eval.toString();
      if (!evalString.includes('eval() usage blocked')) {
        violations.push('eval() interceptor not installed');
      }

      // Check if Function constructor is properly intercepted
      const functionString = window.Function.toString();
      if (!functionString.includes('Function constructor blocked')) {
        violations.push('Function constructor interceptor not installed');
      }
    }

    if (violations.length > 0) {
      console.warn('CSPSecurity: CSP violations detected:', violations);
      return false;
    }

    console.log('CSPSecurity: CSP compliance validated successfully');
    return true;
  }
}

/**
 * Initialize CSP security on application start
 */
export const initializeCSPSecurity = (): void => {
  if (typeof window !== 'undefined') {
    // Only install interceptors in production to avoid development issues
    if (import.meta.env.PROD) {
      CSPSecurity.installCSPInterceptors();

      // Validate compliance after installation
      setTimeout(() => {
        CSPSecurity.validateCSPCompliance();
      }, 100);
    } else {
      console.log('CSPSecurity: Skipped in development mode');
    }
  }
};

export default CSPSecurity;
