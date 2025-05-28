#!/usr/bin/env node

/**
 * Script para corrigir problemas de i18n
 * Limpa localStorage e força idioma pt-BR
 */

console.log('🔧 Fixing i18n issues...');

// Instruções para o usuário
console.log(`
📋 INSTRUÇÕES PARA CORRIGIR TRADUÇÕES:

1. Abra o DevTools do navegador (F12)
2. Vá para a aba Console
3. Execute os seguintes comandos:

   // Limpar cache do i18n
   localStorage.clear();
   
   // Forçar idioma pt-BR
   localStorage.setItem('i18nextLng', 'pt-BR');
   
   // Recarregar página
   location.reload();

4. Ou use as funções de debug disponíveis:
   
   // Mostrar relatório de debug
   debugI18n();
   
   // Limpar cache e recarregar
   clearI18nCache();
   
   // Forçar idioma específico
   forceLanguage('pt-BR');

5. Se o problema persistir, verifique:
   - Se o navegador está detectando o idioma correto
   - Se há erros no console relacionados ao i18n
   - Se os arquivos de tradução estão sendo carregados

✅ O componente HeroTranslationTest está ativo no canto superior esquerdo
   para ajudar no debug das traduções.
`);

console.log('✅ Script executado. Siga as instruções acima.');
