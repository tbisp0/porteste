# 🔄 Guia de Migração - Sistema de Botões

## 📋 **RESUMO**

Este guia ajuda na migração dos botões antigos para o novo sistema modular organizado.

## 🗺️ **MAPEAMENTO DE ARQUIVOS**

### **Antes → Depois**

```
// ARQUIVOS ANTIGOS → NOVOS LOCAIS
src/components/ui/button.tsx                    → src/components/ui/buttons/base/Button.tsx
src/components/ui/CTAButton.tsx                 → src/components/ui/buttons/base/CTAButton.tsx
src/components/ui/EnhancedButton.tsx            → src/components/ui/buttons/base/EnhancedButton.tsx
src/components/ui/MobileMenuButton.tsx          → src/components/ui/buttons/navigation/MobileMenuButton.tsx
src/components/ui/MobileConfigButton.tsx        → src/components/ui/buttons/navigation/MobileConfigButton.tsx
src/components/ui/SimpleThemeToggle.tsx         → src/components/ui/buttons/system/SimpleThemeToggle.tsx
src/components/ui/SoundToggle.tsx               → src/components/ui/buttons/system/SoundToggle.tsx
src/components/ui/LanguageSwitcher.tsx          → src/components/ui/buttons/system/LanguageSwitcher.tsx
src/components/ui/AccessibilityButton.tsx       → src/components/ui/buttons/accessibility/AccessibilityButton.tsx
src/components/FloatingFeedbackButton.tsx      → src/components/ui/buttons/feedback/FloatingFeedbackButton.tsx
```

## 🔧 **ATUALIZAÇÕES DE IMPORTAÇÃO**

### **1. Importações Simples**

```typescript
// ❌ ANTES
import { Button } from '@/components/ui/button';
import CTAButton from '@/components/ui/CTAButton';
import SimpleThemeToggle from '@/components/ui/SimpleThemeToggle';

// ✅ DEPOIS
import { 
  Button, 
  CTAButton, 
  SimpleThemeToggle 
} from '@/components/ui/buttons';
```

### **2. Importações Múltiplas**

```typescript
// ❌ ANTES
import { Button } from '@/components/ui/button';
import CTAButton from '@/components/ui/CTAButton';
import { EnhancedButton } from '@/components/ui/EnhancedButton';
import MobileMenuButton from '@/components/ui/MobileMenuButton';
import SoundToggle from '@/components/ui/SoundToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

// ✅ DEPOIS
import { 
  Button,
  CTAButton,
  EnhancedButton,
  MobileMenuButton,
  SoundToggle,
  LanguageSwitcher
} from '@/components/ui/buttons';
```

### **3. Importações com Tipos**

```typescript
// ❌ ANTES
import { Button, type ButtonProps } from '@/components/ui/button';
import CTAButton from '@/components/ui/CTAButton';

// ✅ DEPOIS
import { 
  Button, 
  CTAButton,
  type ButtonProps,
  type CTAButtonProps
} from '@/components/ui/buttons';
```

## 📝 **SCRIPT DE MIGRAÇÃO AUTOMÁTICA**

### **Find & Replace Global (VS Code)**

1. **Abrir Find & Replace** (`Ctrl+Shift+H`)
2. **Habilitar Regex** (ícone `.*`)
3. **Aplicar as substituições abaixo:**

```regex
# Botão base
Find: import\s*\{\s*Button[^}]*\}\s*from\s*['"]@/components/ui/button['"];?
Replace: import { Button, buttonVariants } from '@/components/ui/buttons';

# CTAButton
Find: import\s+CTAButton\s+from\s*['"]@/components/ui/CTAButton['"];?
Replace: import { CTAButton } from '@/components/ui/buttons';

# EnhancedButton
Find: import\s*\{[^}]*EnhancedButton[^}]*\}\s*from\s*['"]@/components/ui/EnhancedButton['"];?
Replace: import { EnhancedButton, ProjectCardButton } from '@/components/ui/buttons';

# SimpleThemeToggle
Find: import\s+SimpleThemeToggle\s+from\s*['"]@/components/ui/SimpleThemeToggle['"];?
Replace: import { SimpleThemeToggle } from '@/components/ui/buttons';

# SoundToggle
Find: import\s+SoundToggle\s+from\s*['"]@/components/ui/SoundToggle['"];?
Replace: import { SoundToggle } from '@/components/ui/buttons';

# LanguageSwitcher
Find: import\s*\{\s*LanguageSwitcher\s*\}\s*from\s*['"]@/components/ui/LanguageSwitcher['"];?
Replace: import { LanguageSwitcher } from '@/components/ui/buttons';
```

## 🔍 **VERIFICAÇÃO PÓS-MIGRAÇÃO**

### **1. Verificar Importações**

```bash
# Buscar importações antigas que ainda existem
grep -r "from '@/components/ui/button'" src/
grep -r "from '@/components/ui/CTAButton'" src/
grep -r "from '@/components/ui/SimpleThemeToggle'" src/
grep -r "from '@/components/ui/SoundToggle'" src/
```

### **2. Verificar Funcionalidade**

```typescript
// Teste básico - todos os botões devem funcionar
import { 
  Button,
  CTAButton,
  SimpleThemeToggle,
  SoundToggle,
  LanguageSwitcher,
  AccessibilityButton
} from '@/components/ui/buttons';

// Se não houver erros de TypeScript, a migração foi bem-sucedida
```

## ⚠️ **PROBLEMAS COMUNS**

### **1. Erro de Importação**

```typescript
// ❌ ERRO
Module '"@/components/ui/buttons"' has no exported member 'Button'

// ✅ SOLUÇÃO
// Verificar se o arquivo index.ts está correto
// Verificar se o caminho está correto
// Reiniciar o TypeScript server (Ctrl+Shift+P → "TypeScript: Restart TS Server")
```

### **2. Componente Não Encontrado**

```typescript
// ❌ ERRO
Cannot resolve symbol 'CTAButton'

// ✅ SOLUÇÃO
// Verificar se o componente foi exportado corretamente no index.ts
// Verificar se o arquivo do componente existe
// Verificar se não há erros de sintaxe no componente
```

### **3. Props Incompatíveis**

```typescript
// ❌ ERRO
Property 'variant' does not exist on type 'ButtonProps'

// ✅ SOLUÇÃO
// Verificar se está usando o tipo correto
// Verificar se as props foram atualizadas corretamente
// Consultar a documentação do componente específico
```

## 🧹 **LIMPEZA PÓS-MIGRAÇÃO**

### **1. Remover Arquivos Antigos**

```bash
# CUIDADO: Só execute após confirmar que tudo funciona
rm src/components/ui/button.tsx
rm src/components/ui/CTAButton.tsx
rm src/components/ui/EnhancedButton.tsx
rm src/components/ui/MobileMenuButton.tsx
rm src/components/ui/MobileConfigButton.tsx
rm src/components/ui/SimpleThemeToggle.tsx
rm src/components/ui/SoundToggle.tsx
rm src/components/ui/LanguageSwitcher.tsx
rm src/components/ui/AccessibilityButton.tsx
rm src/components/FloatingFeedbackButton.tsx
```

### **2. Atualizar Exports**

```typescript
// Remover exports antigos de arquivos index se existirem
// Atualizar documentação
// Atualizar testes se necessário
```

## ✅ **CHECKLIST DE MIGRAÇÃO**

- [ ] Todas as importações atualizadas
- [ ] Nenhum erro de TypeScript
- [ ] Todos os botões funcionando
- [ ] Estilos mantidos
- [ ] Animações funcionando
- [ ] Sons funcionando
- [ ] Acessibilidade mantida
- [ ] Testes passando (se existirem)
- [ ] Arquivos antigos removidos
- [ ] Documentação atualizada

## 🎉 **CONCLUSÃO**

Após a migração, você terá:
- ✅ **Importações centralizadas** e organizadas
- ✅ **Melhor performance** com tree shaking
- ✅ **Manutenção simplificada**
- ✅ **Estrutura escalável**
- ✅ **Compatibilidade total** mantida

A migração é **100% compatível** - nenhuma funcionalidade é perdida! 🚀
