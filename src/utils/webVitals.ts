import React from 'react';
import { getCLS, getFID, getFCP, getLCP, getTTFB, Metric } from 'web-vitals';

interface VitalMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
}

// Thresholds para classificação das métricas
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FID: { good: 100, poor: 300 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 }
};

const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

const sendToAnalytics = (metric: Metric) => {
  const vitalMetric: VitalMetric = {
    name: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    delta: metric.delta,
    id: metric.id
  };

  // Enviar para Google Analytics 4 (se disponível)
  if (typeof gtag !== 'undefined') {
    gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: vitalMetric.rating,
      non_interaction: true,
      custom_parameter_1: metric.id,
    });
  }

  // Enviar para console em desenvolvimento
  if (import.meta.env.DEV) {
    console.group(`🔍 Web Vital: ${metric.name}`);
    console.log(`📊 Valor: ${metric.value.toFixed(2)}${metric.name === 'CLS' ? '' : 'ms'}`);
    console.log(`⭐ Rating: ${vitalMetric.rating}`);
    console.log(`🔄 Delta: ${metric.delta}`);
    console.log(`🆔 ID: ${metric.id}`);
    console.groupEnd();
  }

  // Opcional: Enviar para serviço de monitoramento personalizado
  if (import.meta.env.PROD) {
    sendToCustomAnalytics(vitalMetric);
  }
};

const sendToCustomAnalytics = (metric: VitalMetric) => {
  // Implementar envio para serviço personalizado (ex: Vercel Analytics, DataDog, etc.)
  try {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
    }).catch(err => {
      console.warn('Falha ao enviar Web Vitals:', err);
    });
  } catch (error) {
    console.warn('Erro no envio de Web Vitals:', error);
  }
};

export const initWebVitals = () => {
  try {
    getCLS(sendToAnalytics);
    getFID(sendToAnalytics);
    getFCP(sendToAnalytics);
    getLCP(sendToAnalytics);
    getTTFB(sendToAnalytics);

    // Web Vitals monitoring initialized successfully
  } catch (error) {
    console.warn('❌ Failed to initialize Web Vitals:', error);
  }
};

// Hook para usar Web Vitals em componentes React
export const useWebVitals = () => {
  const [metrics, setMetrics] = React.useState<VitalMetric[]>([]);

  React.useEffect(() => {
    const handleMetric = (metric: Metric) => {
      const vitalMetric: VitalMetric = {
        name: metric.name,
        value: metric.value,
        rating: getRating(metric.name, metric.value),
        delta: metric.delta,
        id: metric.id
      };

      setMetrics(prev => [...prev.filter(m => m.name !== metric.name), vitalMetric]);
    };

    getCLS(handleMetric);
    getFID(handleMetric);
    getFCP(handleMetric);
    getLCP(handleMetric);
    getTTFB(handleMetric);
  }, []);

  return metrics;
};

export default initWebVitals;
