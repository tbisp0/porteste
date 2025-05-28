/**
 * 🎯 TRADUÇÕES DO BACKLOG CARD
 */

import { useComponentTranslation } from './useComponentTranslation';

export const BACKLOG_CARD_REQUIRED_KEYS = [
  'title',
  'description',
  'solution',
  'result', 
  'note',
  'noItems',
  'previous',
  'next'
];

export const useBacklogCardTranslation = () => {
  return useComponentTranslation({
    component: 'backlog',
    namespace: 'backlog'
  });
};
