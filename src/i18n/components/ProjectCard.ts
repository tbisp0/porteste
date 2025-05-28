/**
 * 🎯 TRADUÇÕES DO PROJECT CARD
 */

import { useComponentTranslation } from './useComponentTranslation';

export const PROJECT_CARD_REQUIRED_KEYS = [
  'title',
  'viewProject',
  'technologies',
  'status.completed',
  'status.inProgress',
  'status.planned'
];

export const useProjectCardTranslation = () => {
  return useComponentTranslation({
    component: 'projects',
    namespace: 'projects'
  });
};
