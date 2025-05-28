/**
 * 🎯 TRADUÇÕES DO PROFILE CARD
 */

import { useComponentTranslation } from './useComponentTranslation';

export const PROFILE_CARD_REQUIRED_KEYS = [
  'name',
  'bio', 
  'hero.greeting',
  'hero.roles.uxDesigner',
  'hero.roles.productDesigner',
  'hero.roles.designStrategist',
  'hero.roles.interactionDesigner',
  'letsChat',
  'exploreProjects',
  'downloadCV'
];

export const useProfileCardTranslation = () => {
  return useComponentTranslation({
    component: 'profile',
    namespace: 'profile'
  });
};
