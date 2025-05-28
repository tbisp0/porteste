// Fix para problemas de React em produção
// Este arquivo garante que o React esteja disponível globalmente

import * as React from 'react';

// Garantir que React está disponível no window para bibliotecas que dependem dele
if (typeof window !== 'undefined') {
  (window as any).React = React;
  (window as any).react = React;
}

// Garantir que React está disponível no global para Node.js/SSR
if (typeof global !== 'undefined') {
  (global as any).React = React;
  (global as any).react = React;
}

// Export para garantir que o módulo seja processado
export default React;
