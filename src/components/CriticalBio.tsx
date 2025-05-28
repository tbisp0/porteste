import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Critical Bio Component - Now with i18n support
 * Updated to support multiple languages while maintaining performance
 */

interface CriticalBioProps {
  className?: string;
}

const CriticalBio: React.FC<CriticalBioProps> = ({ className = '' }) => {
  const { t, i18n } = useTranslation();
  const [forceUpdate, setForceUpdate] = React.useState(0);

  // Forçar re-render quando idioma mudar
  React.useEffect(() => {
    setForceUpdate(prev => prev + 1);
  }, [i18n.language]);

  // Traduções diretas baseadas no idioma atual (seguindo a lógica existente)
  const getBioText = () => {
    // Primeiro tenta usar a tradução do i18n
    const bioFromI18n = t('profile.bio');

    // Se a tradução carregou corretamente (não retorna a chave), usa ela
    if (bioFromI18n && bioFromI18n !== 'profile.bio') {
      return bioFromI18n;
    }

    // Fallback direto por idioma
    switch (i18n.language) {
      case 'en-US':
        return "I am a UX/Product Designer with strong expertise in designing digital products focused on user experience, conversion and business impact. With a background in Digital Marketing, SEO and AI, I integrate strategy, design and usability in continuous improvement and innovation processes.";
      case 'es-ES':
        return "Soy UX/Product Designer con amplia experiencia en el diseño de productos digitales enfocados en experiencia del usuario, conversión e impacto empresarial. Con formación en Marketing Digital, SEO e IA, integro estrategia, diseño y usabilidad en procesos continuos de mejora e innovación.";
      default:
        return "Sou UX/Product Designer com forte atuação no design de produtos digitais focados em experiência do usuário, conversão e impacto de negócio. Com background em Marketing Digital, SEO e IA, integro estratégia, design e usabilidade em processos contínuos de melhoria e inovação.";
    }
  };

  return (
    <div className={`mb-8 ${className}`}>
      <p className="critical-bio-text">
        {getBioText()}
      </p>
    </div>
  );
};

export default CriticalBio;
