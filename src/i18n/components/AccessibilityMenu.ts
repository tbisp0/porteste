/**
 * 🎯 TRADUÇÕES DO ACCESSIBILITY MENU
 */

import { useComponentTranslation } from './useComponentTranslation';

export const ACCESSIBILITY_MENU_REQUIRED_KEYS = [
  'menu',
  'description',
  'skipToContent',
  'skipToNavigation',
  'increaseTextSize',
  'decreaseTextSize',
  'highContrast',
  'screenReader'
];

export const useAccessibilityMenuTranslation = () => {
  return useComponentTranslation({
    component: 'accessibility',
    namespace: 'accessibility'
  });
};
