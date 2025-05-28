import React from 'react';
import { motion } from 'framer-motion';
import { useCurrentSection } from '@/components/FluidGradientBackground';

/**
 * Componente de demonstração do sistema de gradientes fluidos
 * Mostra como o gradiente muda conforme as seções
 */
const FluidGradientDemo: React.FC = () => {
  const currentSection = useCurrentSection();

  const getSectionColor = (sectionId: string) => {
    const colors = {
      'perfil': 'text-blue-600',
      'projetos': 'text-emerald-600', 
      'backlog': 'text-purple-600',
      'contato': 'text-pink-600'
    };
    return colors[sectionId as keyof typeof colors] || 'text-gray-600';
  };

  const getSectionDescription = (sectionId: string) => {
    const descriptions = {
      'perfil': 'Gradiente azul profissional - representa confiança e expertise',
      'projetos': 'Gradiente verde crescimento - simboliza desenvolvimento e sucesso',
      'backlog': 'Gradiente roxo estratégico - indica planejamento e visão',
      'contato': 'Gradiente rosa acolhedor - transmite acessibilidade e conexão'
    };
    return descriptions[sectionId as keyof typeof descriptions] || 'Gradiente base';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700 max-w-sm"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse"></div>
          <h3 className="font-semibold text-sm">Sistema de Gradientes</h3>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 dark:text-gray-400">Seção Atual:</span>
            <span className={`text-sm font-medium ${getSectionColor(currentSection.id)}`}>
              {currentSection.displayName}
            </span>
          </div>
          
          <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            {getSectionDescription(currentSection.id)}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1 mt-3">
          {['perfil', 'projetos', 'backlog', 'contato'].map((section) => (
            <div
              key={section}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSection.id === section
                  ? getSectionColor(section).replace('text-', 'bg-')
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Componente para mostrar as cores do gradiente atual
 */
export const GradientColorPreview: React.FC = () => {
  const currentSection = useCurrentSection();

  const getGradientPreview = (sectionId: string) => {
    const gradients = {
      'perfil': 'bg-gradient-to-r from-blue-500/20 via-blue-300/10 to-blue-500/20',
      'projetos': 'bg-gradient-to-r from-emerald-500/20 via-emerald-300/10 to-emerald-500/20',
      'backlog': 'bg-gradient-to-r from-purple-500/20 via-purple-300/10 to-purple-500/20',
      'contato': 'bg-gradient-to-r from-pink-500/20 via-pink-300/10 to-pink-500/20'
    };
    return gradients[sectionId as keyof typeof gradients] || 'bg-gray-100';
  };

  return (
    <div className="fixed top-20 left-4 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 shadow-md">
      <div className="text-xs font-medium mb-2">Preview do Gradiente:</div>
      <div className={`w-32 h-8 rounded ${getGradientPreview(currentSection.id)} border border-gray-200 dark:border-gray-700`}></div>
      <div className="text-xs text-gray-500 mt-1">{currentSection.displayName}</div>
    </div>
  );
};

export default FluidGradientDemo;
