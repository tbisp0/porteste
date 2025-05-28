/**
 * 🎯 TRADUÇÕES DO THEME TOGGLE
 */

import { useComponentTranslation } from './useComponentTranslation';

export const THEME_TOGGLE_REQUIRED_KEYS = [
  'toggle',
  'light',
  'dark',
  'changed'
];

export const useThemeToggleTranslation = () => {
  return useComponentTranslation({
    component: 'theme',
    namespace: 'theme'
  });
};
