import { useState, useEffect } from 'react';

// Breakpoints correspondentes ao Tailwind CSS
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint() {
  // Estado inicial com detecção do breakpoint atual
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(() => {
    // Evitar execução durante SSR
    if (typeof window === 'undefined') return 'md';

    const width = window.innerWidth;

    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'sm';
  });

  // Estado para indicar se é mobile ou desktop
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoints.md;
  });
  useEffect(() => {
    // Função para atualizar o breakpoint
    const handleResize = () => {
      const width = window.innerWidth;

      // Atualizar isMobile
      setIsMobile(width < breakpoints.md);

      // Atualizar breakpoint
      if (width >= breakpoints['2xl']) {
        setBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setBreakpoint('md');
      } else {
        setBreakpoint('sm');
      }
    };
    
    // Ouvir evento de redimensionamento
    window.addEventListener('resize', handleResize);
    
    // Garantir que o estado inicial esteja correto
    handleResize();

    // Limpar listener ao desmontar
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return { 
    breakpoint, 
    isMobile,
    isTablet: breakpoint === 'md',
    isDesktop: breakpoint !== 'sm' && breakpoint !== 'md',
    isLargeDesktop: breakpoint === '2xl',
  };
}

export default useBreakpoint;