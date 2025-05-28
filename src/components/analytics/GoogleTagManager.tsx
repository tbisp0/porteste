import { useEffect } from 'react';

interface GTMProps {
  gtmId: string;
}

// Declaração de tipos para o dataLayer
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

const GoogleTagManager: React.FC<GTMProps> = ({ gtmId }) => {
  useEffect(() => {
    // Inicializar dataLayer se não existir
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      
      // Função gtag para enviar eventos
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      
      // Configurar GTM
      window.gtag('js', new Date());
      window.gtag('config', gtmId);
    }
  }, [gtmId]);

  return null;
};

// Componente para o script do GTM no head
export const GTMHead: React.FC<GTMProps> = ({ gtmId }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && gtmId) {
      // Script do GTM para o head
      const script = document.createElement('script');
      script.innerHTML = `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${gtmId}');
      `;
      
      // Adicionar ao head
      document.head.appendChild(script);
      
      // Cleanup
      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [gtmId]);

  return null;
};

// Componente para o noscript do GTM no body
export const GTMBody: React.FC<GTMProps> = ({ gtmId }) => {
  useEffect(() => {
    if (typeof window !== 'undefined' && gtmId) {
      // Criar noscript para o body
      const noscript = document.createElement('noscript');
      noscript.innerHTML = `
        <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
        height="0" width="0" style="display:none;visibility:hidden"></iframe>
      `;
      
      // Adicionar logo após a abertura do body
      document.body.insertBefore(noscript, document.body.firstChild);
      
      // Cleanup
      return () => {
        if (document.body.contains(noscript)) {
          document.body.removeChild(noscript);
        }
      };
    }
  }, [gtmId]);

  return null;
};

// Hook para enviar eventos personalizados ao GTM
export const useGTM = () => {
  const sendEvent = (eventName: string, parameters: Record<string, any> = {}) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  };

  const sendPageView = (pagePath: string, pageTitle?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'GTM-M2NFRBD9', {
        page_path: pagePath,
        page_title: pageTitle || document.title,
      });
    }
  };

  const sendConversion = (conversionId: string, value?: number, currency?: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: conversionId,
        value: value,
        currency: currency || 'BRL',
      });
    }
  };

  return {
    sendEvent,
    sendPageView,
    sendConversion,
  };
};

export default GoogleTagManager;
