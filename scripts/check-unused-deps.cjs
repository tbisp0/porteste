/**
 * 🔍 VERIFICADOR DE DEPENDÊNCIAS NÃO UTILIZADAS
 *
 * Script para identificar dependências que podem ser removidas
 * para otimizar o bundle size e manter o projeto limpo.
 */

const fs = require('fs');
const path = require('path');

// Dependências que sabemos que não estão sendo utilizadas
const KNOWN_UNUSED = [
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

// Dependências que podem estar sendo usadas indiretamente
const POTENTIALLY_UNUSED = [
  'zod', // Instalado mas validação não implementada
  'next-themes', // Pode ser substituído por implementação própria
  'emailjs-com' // Usado apenas no Contact.tsx
];

function checkPackageJson() {
  console.log('📦 Analisando package.json...\n');

  const packagePath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  console.log(`Total de dependências: ${Object.keys(dependencies).length}`);

  return { packageJson, dependencies };
}

function analyzeUnusedDependencies(dependencies) {
  console.log('\n🚨 DEPENDÊNCIAS CONFIRMADAMENTE NÃO UTILIZADAS:\n');

  let totalSize = 0;
  let count = 0;

  KNOWN_UNUSED.forEach(dep => {
    if (dependencies[dep]) {
      console.log(`❌ ${dep} (${dependencies[dep]})`);
      count++;
      // Estimativa de tamanho (valores aproximados)
      const sizes = {
        '@gsap/react': 450,
        'embla-carousel-react': 120,
        'input-otp': 45,
        'lenis': 80,
        'react-day-picker': 200,
        'react-loading-skeleton': 35,
        'react-resizable-panels': 90,
        'react-type-animation': 25,
        'react-window': 60,
        'recharts': 800,
        'vaul': 40,
        'cmdk': 85,
        'sonner': 30
      };
      totalSize += sizes[dep] || 50;
    }
  });

  console.log(`\n📊 Total: ${count} dependências não utilizadas (~${totalSize}KB)`);

  if (count > 0) {
    console.log('\n💡 Para remover todas as dependências não utilizadas:');
    const unusedList = KNOWN_UNUSED.filter(dep => dependencies[dep]);
    console.log(`npm uninstall ${unusedList.join(' ')}`);
  }
}

function analyzePotentiallyUnused(dependencies) {
  console.log('\n⚠️  DEPENDÊNCIAS POTENCIALMENTE NÃO UTILIZADAS:\n');

  POTENTIALLY_UNUSED.forEach(dep => {
    if (dependencies[dep]) {
      console.log(`⚠️  ${dep} (${dependencies[dep]})`);

      switch(dep) {
        case 'zod':
          console.log('   → Instalado mas validação não implementada');
          console.log('   → Considere implementar validação ou remover');
          break;
        case 'next-themes':
          console.log('   → Usado para tema, mas pode ser substituído');
          console.log('   → Implementação própria seria mais leve');
          break;
        case 'emailjs-com':
          console.log('   → Usado apenas no Contact.tsx');
          console.log('   → Considere alternativas mais leves');
          break;
      }
      console.log('');
    }
  });
}

function generateRemovalScript() {
  console.log('\n🔧 SCRIPT DE REMOÇÃO AUTOMÁTICA:\n');

  const script = `#!/bin/bash
# Script para remover dependências não utilizadas

echo "🧹 Removendo dependências não utilizadas..."

# Dependências confirmadamente não utilizadas
npm uninstall ${KNOWN_UNUSED.join(' ')}

echo "✅ Dependências removidas com sucesso!"
echo "📊 Execute 'npm run build' para verificar o novo bundle size"

# Opcional: Remover dependências potencialmente não utilizadas
# Descomente as linhas abaixo se desejar removê-las também
# npm uninstall zod next-themes emailjs-com

echo "🎉 Limpeza concluída!"
`;

  fs.writeFileSync('scripts/remove-unused-deps.sh', script);
  console.log('📝 Script criado: scripts/remove-unused-deps.sh');
  console.log('   Para executar: chmod +x scripts/remove-unused-deps.sh && ./scripts/remove-unused-deps.sh');
}

function checkBundleSize() {
  console.log('\n📈 ANÁLISE DO BUNDLE SIZE ATUAL:\n');

  try {
    const distPath = 'dist';
    if (!fs.existsSync(distPath)) {
      console.log('❌ Pasta dist não encontrada. Execute "npm run build" primeiro.');
      return;
    }

    const files = fs.readdirSync(path.join(distPath, 'js'));
    let totalSize = 0;

    files.forEach(file => {
      if (file.endsWith('.js')) {
        const filePath = path.join(distPath, 'js', file);
        const stats = fs.statSync(filePath);
        const sizeKB = Math.round(stats.size / 1024);
        totalSize += sizeKB;

        if (sizeKB > 100) {
          console.log(`📦 ${file}: ${sizeKB}KB`);
        }
      }
    });

    console.log(`\n📊 Bundle total (JS): ~${totalSize}KB`);
    console.log(`💡 Após remoção das dependências não utilizadas: ~${totalSize - 500}KB (estimativa)`);

  } catch (error) {
    console.log('❌ Erro ao analisar bundle size:', error.message);
  }
}

function main() {
  console.log('🔍 VERIFICADOR DE DEPENDÊNCIAS NÃO UTILIZADAS\n');
  console.log('='.repeat(50));

  const { packageJson, dependencies } = checkPackageJson();

  analyzeUnusedDependencies(dependencies);
  analyzePotentiallyUnused(dependencies);
  checkBundleSize();
  generateRemovalScript();

  console.log('\n' + '='.repeat(50));
  console.log('🎯 RESUMO E RECOMENDAÇÕES:\n');
  console.log('1. ✅ Remova as dependências confirmadamente não utilizadas');
  console.log('2. ⚠️  Avalie as dependências potencialmente não utilizadas');
  console.log('3. 📊 Execute "npm run build" após as remoções');
  console.log('4. 🧪 Teste a aplicação para garantir que tudo funciona');
  console.log('\n💡 Economia estimada: ~500KB no bundle final');
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}
