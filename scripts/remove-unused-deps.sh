#!/bin/bash
# Script para remover dependências não utilizadas

echo "🧹 Removendo dependências não utilizadas..."

# Dependências confirmadamente não utilizadas
npm uninstall @gsap/react embla-carousel-react input-otp lenis react-day-picker react-loading-skeleton react-resizable-panels react-type-animation react-window recharts vaul cmdk sonner

echo "✅ Dependências removidas com sucesso!"
echo "📊 Execute 'npm run build' para verificar o novo bundle size"

# Opcional: Remover dependências potencialmente não utilizadas
# Descomente as linhas abaixo se desejar removê-las também
# npm uninstall zod next-themes emailjs-com

echo "🎉 Limpeza concluída!"
