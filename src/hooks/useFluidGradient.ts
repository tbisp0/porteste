import { useEffect, useState, useCallback } from 'react';

interface SectionConfig {
  id: string;
  className: string;
  threshold: number; // Porcentagem da tela para ativar
}

const SECTIONS: SectionConfig[] = [
  { id: 'perfil', className: 'section-profile', threshold: 0.3 },
  { id: 'projetos', className: 'section-projects', threshold: 0.3 },
  { id: 'backlog', className: 'section-backlog', threshold: 0.3 },
  { id: 'contato', className: 'section-contact', threshold: 0.3 },
];

export const useFluidGradient = () => {
  const [currentSection, setCurrentSection] = useState<string>('section-profile');
  const [isScrolling, setIsScrolling] = useState(false);

  // Função para detectar qual seção está ativa
  const detectActiveSection = useCallback(() => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Se estiver no topo da página, sempre mostrar perfil
    if (scrollY < windowHeight * 0.2) {
      return 'section-profile';
    }

    // Verificar cada seção
    for (const section of SECTIONS) {
      const element = document.getElementById(section.id);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const elementHeight = rect.height;
      const elementCenter = elementTop + (elementHeight / 2);

      // Se o centro da seção está visível na tela
      const viewportCenter = scrollY + (windowHeight / 2);
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter);
      
      // Se está próximo do centro da viewport
      if (distanceFromCenter < elementHeight * 0.6) {
        return section.className;
      }
    }

    return currentSection; // Manter seção atual se nenhuma for detectada
  }, [currentSection]);

  // Função otimizada de scroll com throttling
  const handleScroll = useCallback(() => {
    if (!isScrolling) {
      setIsScrolling(true);
      
      requestAnimationFrame(() => {
        const newSection = detectActiveSection();
        if (newSection !== currentSection) {
          setCurrentSection(newSection);
        }
        setIsScrolling(false);
      });
    }
  }, [currentSection, detectActiveSection, isScrolling]);

  // Aplicar classe ao container de gradiente
  const applyGradientClass = useCallback((sectionClass: string) => {
    const container = document.querySelector('.fluid-gradient-container');
    if (!container) return;

    // Remover todas as classes de seção
    SECTIONS.forEach(section => {
      container.classList.remove(section.className);
    });

    // Adicionar nova classe com pequeno delay para transição suave
    setTimeout(() => {
      container.classList.add(sectionClass);
    }, 50);
  }, []);

  // Effect para scroll listener
  useEffect(() => {
    // Configurar scroll listener otimizado
    const scrollOptions = {
      passive: true,
      capture: false
    };

    window.addEventListener('scroll', handleScroll, scrollOptions);
    
    // Detectar seção inicial
    const initialSection = detectActiveSection();
    setCurrentSection(initialSection);

    return () => {
      window.removeEventListener('scroll', handleScroll, scrollOptions);
    };
  }, [handleScroll, detectActiveSection]);

  // Effect para aplicar classes CSS
  useEffect(() => {
    applyGradientClass(currentSection);
  }, [currentSection, applyGradientClass]);

  // Função para forçar mudança de seção (útil para navegação)
  const setSection = useCallback((sectionId: string) => {
    const sectionConfig = SECTIONS.find(s => s.id === sectionId);
    if (sectionConfig) {
      setCurrentSection(sectionConfig.className);
    }
  }, []);

  // Função para obter informações da seção atual
  const getCurrentSectionInfo = useCallback(() => {
    const config = SECTIONS.find(s => s.className === currentSection);
    return {
      id: config?.id || 'perfil',
      className: currentSection,
      displayName: getSectionDisplayName(config?.id || 'perfil')
    };
  }, [currentSection]);

  return {
    currentSection,
    setSection,
    getCurrentSectionInfo,
    isScrolling
  };
};

// Função auxiliar para nomes de exibição
const getSectionDisplayName = (sectionId: string): string => {
  const names: Record<string, string> = {
    'perfil': 'Perfil',
    'projetos': 'Projetos',
    'backlog': 'Backlog Estratégico',
    'contato': 'Contato'
  };
  return names[sectionId] || sectionId;
};

// Hook para criar o container de gradiente
export const useGradientContainer = () => {
  useEffect(() => {
    // Verificar se já existe
    if (document.querySelector('.fluid-gradient-container')) {
      return;
    }

    // Criar container de gradiente
    const gradientContainer = document.createElement('div');
    gradientContainer.className = 'fluid-gradient-container section-profile';
    
    // Inserir no início do body
    document.body.insertBefore(gradientContainer, document.body.firstChild);

    // Cleanup
    return () => {
      const container = document.querySelector('.fluid-gradient-container');
      if (container) {
        container.remove();
      }
    };
  }, []);
};

// Hook combinado para facilitar uso
export const useFluidGradientSystem = () => {
  useGradientContainer();
  const gradientControls = useFluidGradient();
  
  return gradientControls;
};

// Função utilitária para transições manuais (navegação)
export const triggerSectionTransition = (sectionId: string) => {
  const container = document.querySelector('.fluid-gradient-container');
  if (!container) return;

  const sectionConfig = SECTIONS.find(s => s.id === sectionId);
  if (!sectionConfig) return;

  // Remover todas as classes
  SECTIONS.forEach(section => {
    container.classList.remove(section.className);
  });

  // Adicionar nova classe
  container.classList.add(sectionConfig.className);
};

export default useFluidGradient;
