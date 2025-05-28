/**
 * 🎯 TRADUÇÕES DO HEADER
 */

import { useComponentTranslation } from './useComponentTranslation';

export const HEADER_REQUIRED_KEYS = [
  'navigation.home',
  'navigation.about', 
  'navigation.projects',
  'navigation.contact',
  'navigation.backlog',
  'tooltips.theme.light',
  'tooltips.theme.dark',
  'tooltips.language.switch',
  'tooltips.sound.enable',
  'tooltips.sound.disable'
];

export const useHeaderTranslation = () => {
  return useComponentTranslation({
    component: 'header',
    namespace: 'navigation'
  });
};
