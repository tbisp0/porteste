/**
 * 🎯 TRADUÇÕES DO SOUND TOGGLE
 */

import { useComponentTranslation } from './useComponentTranslation';

export const SOUND_TOGGLE_REQUIRED_KEYS = [
  'enabled',
  'disabled',
  'toggle'
];

export const useSoundToggleTranslation = () => {
  return useComponentTranslation({
    component: 'sound',
    namespace: 'sound'
  });
};
