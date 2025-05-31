import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppProviders } from './app/providers';
import './styles/global.css';

// Import the mock service worker in development mode
if (import.meta.env.DEV) {
  import('./mocks/browser').then(({ worker }) => {
    console.log('Mock Service Worker initialized');
  }).catch(err => {
    console.error('Failed to initialize mock service worker', err);
  });
}

// Carregamento de fontes para evitar FOUT/FOIT
document.documentElement.classList.add('font-loaded');

// Injetar elemento root
ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
  </AppProviders>
);

// Reportar web vitals
import { onCLS, onLCP, onFCP } from 'web-vitals';
import { reportWebVitals } from './utils/analytics';

// Registrar métricas importantes
const webVitals = [onCLS, onLCP, onFCP];
webVitals.forEach((metric) => metric(reportWebVitals));