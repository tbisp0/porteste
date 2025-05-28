import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const MicrosoftClarityInit: React.FC = () => {
  useEffect(() => {
    // Inicializar Microsoft Clarity apenas em produção
    if (import.meta.env.PROD) {
      try {
        // Inicializar Clarity com o Project ID
        const projectId = "rp64ayubme";
        Clarity.init(projectId);

        // Identificar o usuário/portfolio
        Clarity.identify(
          "tarcisio-portfolio", // custom-id (obrigatório)
          undefined, // custom-session-id (opcional)
          undefined, // custom-page-id (opcional)
          "Tarcísio Bispo Portfolio" // friendly-name (opcional)
        );

        // Adicionar tags personalizadas para contexto
        Clarity.setTag("portfolio_owner", "Tarcisio Bispo de Araujo");
        Clarity.setTag("portfolio_type", "UX/Product Designer");
        Clarity.setTag("contact_email", "tbisp0@hotmail.com");
        Clarity.setTag("portfolio_version", "2024");
        Clarity.setTag("site_language", "multi"); // pt, en, es

        // Registrar evento de inicialização do portfolio
        Clarity.event("portfolio_initialized");

        console.log('Microsoft Clarity initialized successfully');

      } catch (error) {
        console.error('Failed to initialize Microsoft Clarity:', error);
      }
    } else {
      console.log('Microsoft Clarity disabled in development mode');
    }
  }, []);

  return null; // Este componente não renderiza nada
};

export default MicrosoftClarityInit;
