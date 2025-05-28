/**
 * 🎯 TRADUÇÕES POR COMPONENTE
 * 
 * Sistema modular de traduções organizadas por componente
 * Facilita manutenção e escalabilidade
 */

// Traduções específicas por componente
export * from './FeedbackModal';
export * from './Header';
export * from './ProfileCard';
export * from './ProjectCard';
export * from './ContactForm';
export * from './BacklogCard';
export * from './LanguageSwitcher';
export * from './ThemeToggle';
export * from './SoundToggle';
export * from './AccessibilityMenu';

// Hook para traduções de componente específico
export { useComponentTranslation } from './useComponentTranslation';
