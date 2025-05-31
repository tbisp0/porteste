declare module 'logrocket' {
  interface LogRocket {
    init(appId: string, options?: Record<string, any>): void;
    identify(uid: string, userInfo?: Record<string, any>): void;
    track(eventName: string, eventProperties?: Record<string, any>): void;
    getSessionURL(): string;
    debug(): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    log(...args: any[]): void;
    info(...args: any[]): void;
    debugMode(enabled?: boolean): void;
    reduxMiddleware(options?: any): any;
    getCurrentSessionUrl(): string;
    getSessionURL(callback: (url: string) => void): void;
    getCurrentSessionURL(callback: (url: string) => void): void;
    onLoad(callback: () => void): void;
    startNewSession(): void;
    sessionURL: string;
    version: string;
  }

  const LogRocket: LogRocket;
  export default LogRocket;
}
