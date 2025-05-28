/**
 * 🎯 TRADUÇÕES DO CONTACT FORM
 */

import { useComponentTranslation } from './useComponentTranslation';

export const CONTACT_FORM_REQUIRED_KEYS = [
  'title',
  'subtitle',
  'form.name',
  'form.email', 
  'form.message',
  'form.send',
  'form.sending',
  'form.success',
  'form.error',
  'validation.nameRequired',
  'validation.emailRequired',
  'validation.emailInvalid',
  'validation.messageRequired'
];

export const useContactFormTranslation = () => {
  return useComponentTranslation({
    component: 'contact',
    namespace: 'contact'
  });
};
