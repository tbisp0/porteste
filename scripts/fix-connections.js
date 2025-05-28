#!/usr/bin/env node

/**
 * 🔧 SCRIPT DE CORREÇÃO AUTOMÁTICA
 * 
 * Corrige automaticamente as conexões faltantes e problemas identificados
 * na curadoria do codebase.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const UNUSED_DEPENDENCIES = [
  '@gsap/react',
  'embla-carousel-react', 
  'input-otp',
  'lenis',
  'react-day-picker',
  'react-loading-skeleton',
  'react-resizable-panels',
  'react-type-animation',
  'react-window',
  'recharts',
  'vaul',
  'cmdk',
  'sonner'
];

const FIXES = {
  // 1. Criar componente faltante
  createMissingComponents: () => {
    console.log('🔧 Criando componentes faltantes...');
    
    const gradientIndicatorContent = `/**
 * 🎯 INDICADOR DE SEÇÕES DE GRADIENTE
 * 
 * Componente de debug para desenvolvimento
 * Mostra informações sobre gradientes ativos
 */

import React from 'react';

export default function GradientSectionIndicator() {
  // Só renderiza em desenvolvimento
  if (import.meta.env.PROD) return null;
  
  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs">
      <div>Debug: Gradient Sections</div>
      <div className="text-green-400">Development Mode</div>
    </div>
  );
}`;

    const debugDir = 'src/components/debug';
    if (!fs.existsSync(debugDir)) {
      fs.mkdirSync(debugDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(debugDir, 'GradientSectionIndicator.tsx'),
      gradientIndicatorContent
    );
    
    console.log('✅ GradientSectionIndicator.tsx criado');
  },

  // 2. Corrigir importações no lazyComponents
  fixLazyImports: () => {
    console.log('🔧 Corrigindo importações lazy...');
    
    const lazyComponentsPath = 'src/utils/lazyComponents.ts';
    let content = fs.readFileSync(lazyComponentsPath, 'utf8');
    
    // Corrigir importação do FeedbackModal
    content = content.replace(
      "import('../components/FeedbackModal')",
      "import('../components/ui/modals').then(module => ({ default: module.FeedbackModal }))"
    );
    
    fs.writeFileSync(lazyComponentsPath, content);
    console.log('✅ Importações lazy corrigidas');
  },

  // 3. Atualizar Header para usar i18n
  updateHeaderI18n: () => {
    console.log('🔧 Atualizando Header para usar i18n...');
    
    const headerPath = 'src/components/Header.tsx';
    let content = fs.readFileSync(headerPath, 'utf8');
    
    // Adicionar import do useTranslation
    if (!content.includes('useTranslation')) {
      content = content.replace(
        "import { useEffect, useState, useCallback } from 'react';",
        "import { useEffect, useState, useCallback } from 'react';\nimport { useTranslation } from 'react-i18next';"
      );
    }
    
    // Adicionar hook no componente
    content = content.replace(
      'export default function Header() {',
      `export default function Header() {
  const { t } = useTranslation();`
    );
    
    // Substituir textos hardcoded
    const replacements = [
      ['\'Perfil\'', 't(\'navigation.profile\')'],
      ['\'Projetos\'', 't(\'navigation.projects\')'],
      ['\'Backlog\'', 't(\'navigation.backlog\')'],
      ['\'Contato\'', 't(\'navigation.contact\')'],
      ['\'Menu\'', 't(\'navigation.menu\')'],
      ['\'Feedback\'', 't(\'navigation.feedback\')'],
      ['\'Fechar\'', 't(\'common.close\')']
    ];
    
    replacements.forEach(([old, new_]) => {
      content = content.replace(new RegExp(old, 'g'), new_);
    });
    
    fs.writeFileSync(headerPath, content);
    console.log('✅ Header atualizado para usar i18n');
  },

  // 4. Criar arquivos de tradução faltantes
  createMissingTranslations: () => {
    console.log('🔧 Criando traduções faltantes...');
    
    const translations = {
      'pt-BR': {
        navigation: {
          profile: 'Perfil',
          projects: 'Projetos', 
          backlog: 'Backlog',
          contact: 'Contato',
          menu: 'Menu',
          feedback: 'Feedback'
        },
        common: {
          close: 'Fechar',
          open: 'Abrir',
          loading: 'Carregando...',
          error: 'Erro',
          success: 'Sucesso'
        }
      },
      'en-US': {
        navigation: {
          profile: 'Profile',
          projects: 'Projects',
          backlog: 'Backlog', 
          contact: 'Contact',
          menu: 'Menu',
          feedback: 'Feedback'
        },
        common: {
          close: 'Close',
          open: 'Open',
          loading: 'Loading...',
          error: 'Error',
          success: 'Success'
        }
      },
      'es-ES': {
        navigation: {
          profile: 'Perfil',
          projects: 'Proyectos',
          backlog: 'Backlog',
          contact: 'Contacto', 
          menu: 'Menú',
          feedback: 'Comentarios'
        },
        common: {
          close: 'Cerrar',
          open: 'Abrir',
          loading: 'Cargando...',
          error: 'Error',
          success: 'Éxito'
        }
      }
    };
    
    Object.entries(translations).forEach(([locale, data]) => {
      const localeDir = `src/i18n/locales/${locale}`;
      if (!fs.existsSync(localeDir)) {
        fs.mkdirSync(localeDir, { recursive: true });
      }
      
      Object.entries(data).forEach(([namespace, translations]) => {
        const filePath = path.join(localeDir, `${namespace}.json`);
        fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));
      });
    });
    
    console.log('✅ Traduções criadas para pt-BR, en-US, es-ES');
  },

  // 5. Remover dependências não utilizadas
  removeUnusedDependencies: () => {
    console.log('🔧 Removendo dependências não utilizadas...');
    
    try {
      const command = `npm uninstall ${UNUSED_DEPENDENCIES.join(' ')}`;
      execSync(command, { stdio: 'inherit' });
      console.log('✅ Dependências não utilizadas removidas');
    } catch (error) {
      console.error('❌ Erro ao remover dependências:', error.message);
    }
  },

  // 6. Atualizar package.json com scripts úteis
  updatePackageScripts: () => {
    console.log('🔧 Atualizando scripts do package.json...');
    
    const packagePath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    packageJson.scripts = {
      ...packageJson.scripts,
      'analyze': 'npm run build && npx vite-bundle-analyzer dist',
      'check-deps': 'npx depcheck',
      'check-unused': 'npx unimported',
      'fix-connections': 'node scripts/fix-connections.js'
    };
    
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Scripts úteis adicionados ao package.json');
  }
};

// Executar todas as correções
async function runAllFixes() {
  console.log('🚀 Iniciando correções automáticas...\n');
  
  try {
    FIXES.createMissingComponents();
    FIXES.fixLazyImports();
    FIXES.updateHeaderI18n();
    FIXES.createMissingTranslations();
    FIXES.updatePackageScripts();
    
    console.log('\n🎉 Todas as correções foram aplicadas com sucesso!');
    console.log('\n📋 Próximos passos manuais:');
    console.log('1. Execute: npm run check-deps');
    console.log('2. Execute: npm run build');
    console.log('3. Teste a aplicação');
    console.log('4. Execute: npm run remove-unused (se desejar)');
    
  } catch (error) {
    console.error('\n❌ Erro durante as correções:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  runAllFixes();
}

export { FIXES, runAllFixes };
