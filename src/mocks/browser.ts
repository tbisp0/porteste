import { setupWorker } from 'msw/browser';
import { handlers } from './api.mock';

// This configures a Service Worker with the given request handlers.
const worker = setupWorker(...handlers);

// Start the worker when in development mode
if (import.meta.env.DEV) {
  worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
  }).catch(err => {
    console.error('Error starting MSW worker:', err);
  });
}

export { worker };
