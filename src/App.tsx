import React, { useState, useEffect, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import { I18nextProvider } from 'react-i18next';
import i18n from './lib/i18n';
import { ThemeProvider } from './app/providers/ThemeContext';
import { AudioProvider } from './app/providers/AudioContext';
import { SettingsProvider } from './app/providers/SettingsContext';
import { ToastProvider } from './app/providers/ToastContext';
import { Header } from './app/layout/Header';
import { Footer } from './app/layout/Footer';
import LoadingFallback from './components/common/LoadingFallback';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

// Lazy-loaded pages for improved performance
const ProjectsPage = React.lazy(() => import('./pages/Projects'));
const ContactPage = React.lazy(() => import('./pages/Contact'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicy'));
const BacklogsPage = React.lazy(() => import('./pages/Backlogs'));

// Analytics
import { trackPageView } from './utils/analytics';

function App() {
  const location = useLocation();

  // Track page views
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <AudioProvider>
          <SettingsProvider>
            <ToastProvider>
              <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
                <Header />
                <main className="flex-grow">
                  <Suspense fallback={<LoadingFallback />}>
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/projetos" element={<ProjectsPage />} />
                      <Route path="/backlogs" element={<BacklogsPage />} />
                      <Route path="/contato" element={<ContactPage />} />
                      <Route path="/politica-de-privacidade" element={<PrivacyPolicyPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                  </Suspense>
                </main>
                <Footer />
              </div>
              <Toaster position="top-right" />
            </ToastProvider>
          </SettingsProvider>
        </AudioProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
}

export default App;