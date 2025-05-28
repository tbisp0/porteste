import * as React from 'react';
import { Suspense } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import LoadingSpinner from "@/components/LoadingSpinner";
import I18nProvider from "@/components/I18nProvider";

// Critical components loaded immediately
import Header from "@/components/Header";

// Lazy loading dos componentes de página para code splitting
const Index = React.lazy(() => import("./pages/Index"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));

// Lazy loading de componentes pesados para reduzir bundle inicial
const AnalyticsProvider = React.lazy(() => import("@/components/analytics/AnalyticsProvider"));
const BackToTop = React.lazy(() => import("@/components/ui/BackToTop"));
const FluidGradientBackground = React.lazy(() => import("@/components/FluidGradientBackground").then(module => ({ default: module.default })));
const GradientSectionIndicator = React.lazy(() => import("@/components/FluidGradientBackground").then(module => ({ default: module.GradientSectionIndicator })));
const FluidGradientDemo = React.lazy(() => import("@/components/examples/FluidGradientDemo"));

const SoundDemo = React.lazy(() => import("@/components/ui/SoundDemo"));
const LazyScripts = React.lazy(() => import("@/components/LazyScripts"));
const CookieConsent = React.lazy(() => import("@/components/CookieConsent"));
const TranslationDebug = React.lazy(() => import("@/components/debug/TranslationDebug"));

const queryClient = new QueryClient();

const App = () => {
  const { t } = useTranslation();

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <TooltipProvider>
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
            <AnalyticsProvider>

            {/* Skip Links para Navegação por Teclado */}
            <a href="#main-content" className="skip-link">
              {t('accessibility.features.skipToContent')}
            </a>
            <a href="#navigation" className="skip-link">
              {t('accessibility.features.skipToNavigation')}
            </a>

            <Toaster />
            <Sonner />



            {/* Sistema de Gradientes Fluidos */}
            <Suspense fallback={null}>
              <FluidGradientBackground />
            </Suspense>

            {/* Indicador de Seção (apenas em desenvolvimento) */}
            {import.meta.env.DEV && (
              <Suspense fallback={null}>
                <GradientSectionIndicator />
              </Suspense>
            )}
            {import.meta.env.DEV && (
              <Suspense fallback={null}>
                <FluidGradientDemo />
              </Suspense>
            )}

            {/* Sound Demo - apenas em desenvolvimento */}
            {import.meta.env.DEV && (
              <div className="fixed bottom-4 right-4 z-50">
                <Suspense fallback={null}>
                  <SoundDemo />
                </Suspense>
              </div>
            )}

            {/* UX Premium Components */}
            <Suspense fallback={null}>
              <BackToTop />
            </Suspense>

            {/* Lazy load third-party scripts */}
            <Suspense fallback={null}>
              <LazyScripts delay={2000} />
            </Suspense>

            {/* Cookie Consent Banner */}
            <Suspense fallback={null}>
              <CookieConsent />
            </Suspense>

            {/* Translation Debug - apenas em desenvolvimento */}
            {import.meta.env.DEV && (
              <Suspense fallback={null}>
                <TranslationDebug />
              </Suspense>
            )}

          <Header />
          <BrowserRouter
            basename="/portfolio"
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true
            }}
          >
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          </AnalyticsProvider>
          </Suspense>
        </TooltipProvider>
        </I18nProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
