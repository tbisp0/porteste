/**
 * 🎯 TRADUÇÕES DO LANGUAGE SWITCHER
 */

import { useComponentTranslation } from './useComponentTranslation';

export const LANGUAGE_SWITCHER_REQUIRED_KEYS = [
  'changed',
  'current',
  'available',
  'portuguese',
  'english',
  'spanish'
];

export const useLanguageSwitcherTranslation = () => {
  return useComponentTranslation({
    component: 'language',
    namespace: 'language'
  });
};
