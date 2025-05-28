import React, { useEffect } from 'react';
import { useFluidGradientSystem } from '@/hooks/useFluidGradient';

interface FluidGradientBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Componente que gerencia o sistema de gradientes fluidos
 * Cria automaticamente o fundo gradiente e controla as transições baseadas no scroll
 */
const FluidGradientBackground: React.FC<FluidGradientBackgroundProps> = ({ 
  children, 
  className = '' 
}) => {
  // Inicializar sistema de gradientes
  const { currentSection, getCurrentSectionInfo } = useFluidGradientSystem();

  // Debug em desenvolvimento
  useEffect(() => {
    if (import.meta.env.DEV) {
      const sectionInfo = getCurrentSectionInfo();
      console.log('🎨 Fluid Gradient:', {
        section: sectionInfo.displayName,
        className: currentSection
      });
    }
  }, [currentSection, getCurrentSectionInfo]);

  return (
    <>
      {/* O hook já cria o container de gradiente automaticamente */}
      {children && (
        <div className={`relative z-10 ${className}`}>
          {children}
        </div>
      )}
    </>
  );
};

/**
 * Componente indicador visual da seção atual (opcional)
 * Útil para debug ou como indicador de navegação
 */
export const GradientSectionIndicator: React.FC = () => {
  const { getCurrentSectionInfo } = useFluidGradientSystem();
  const sectionInfo = getCurrentSectionInfo();

  if (import.meta.env.PROD) {
    return null; // Não mostrar em produção
  }

  return (
    <div className="fixed top-20 right-4 z-50 bg-black/80 text-white px-3 py-2 rounded-lg text-sm font-mono">
      <div className="text-xs opacity-70">Seção Atual:</div>
      <div className="font-semibold">{sectionInfo.displayName}</div>
      <div className="text-xs opacity-50">{sectionInfo.className}</div>
    </div>
  );
};

/**
 * Hook para componentes que precisam reagir às mudanças de seção
 */
export const useCurrentSection = () => {
  const { getCurrentSectionInfo } = useFluidGradientSystem();
  return getCurrentSectionInfo();
};

/**
 * Componente wrapper para seções que precisam de gradientes específicos
 */
interface GradientSectionProps {
  sectionId: 'perfil' | 'projetos' | 'backlog' | 'contato';
  children: React.ReactNode;
  className?: string;
}

export const GradientSection: React.FC<GradientSectionProps> = ({
  sectionId,
  children,
  className = ''
}) => {
  return (
    <section 
      id={sectionId}
      className={`relative ${className}`}
      data-gradient-section={sectionId}
    >
      {children}
    </section>
  );
};

/**
 * Componente para transições manuais de gradiente
 * Útil para navegação ou botões que mudam seção
 */
interface GradientTriggerProps {
  targetSection: 'perfil' | 'projetos' | 'backlog' | 'contato';
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GradientTrigger: React.FC<GradientTriggerProps> = ({
  targetSection,
  children,
  className = '',
  onClick
}) => {
  const { setSection } = useFluidGradientSystem();

  const handleClick = () => {
    setSection(targetSection);
    onClick?.();
  };

  return (
    <div 
      className={`cursor-pointer ${className}`}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default FluidGradientBackground;
