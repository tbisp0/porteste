import './react-fix'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './App.tsx'
// ===== CSS MODULAR UNIFICADO - IMPORTAÇÃO ÚNICA =====
import './styles/index.css' // Sistema CSS modular completo
import './components/ui/buttons/styles/index.css' // CSS modular dos botões
import './components/ui/modals/styles/index.css' // CSS modular dos modais
import './components/mobile/styles/index.css' // CSS mobile unificado
import { ThemeProvider } from './components/providers/ThemeProvider'
import { initializeCacheOptimizations } from './utils/cacheOptimization'
import { initializeImageOptimizations } from './utils/imageOptimization'
import { initializeCSPSecurity } from './utils/cspSecurity'

// Import i18n synchronously to avoid translation errors
import './i18n/config';

// Garantir que React está disponível globalmente
if (typeof window !== 'undefined') {
  (window as any).React = React;
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Renderizar app imediatamente para melhor LCP
const root = ReactDOM.createRoot(rootElement);

// Initialize optimizations after DOM is ready
if (typeof window !== 'undefined') {
  // Initialize immediately for critical resources
  initializeCacheOptimizations();
  initializeImageOptimizations();

  // Initialize security after React is loaded
  setTimeout(() => {
    initializeCSPSecurity();
  }, 1000);
}

// Render immediately with critical content
root.render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
