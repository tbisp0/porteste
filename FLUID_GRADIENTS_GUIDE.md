# 🎨 Sistema de Gradientes Fluidos

Sistema moderno de gradientes que muda dinamicamente conforme o usuário navega pelas seções do site, criando uma experiência visual fluida e diferenciada.

## 🚀 Características

### ✨ **Gradientes Dinâmicos**
- **Perfil**: Azul profissional (confiança e expertise)
- **Projetos**: Verde crescimento (desenvolvimento e sucesso)  
- **Backlog**: Roxo estratégico (planejamento e visão)
- **Contato**: Rosa acolhedor (acessibilidade e conexão)

### 🎯 **Detecção Inteligente**
- Mudança automática baseada no scroll
- Detecção do centro da viewport
- Transições suaves entre seções
- Performance otimizada com throttling

### 🌙 **Modo Escuro Adaptativo**
- Gradientes ajustados automaticamente
- Opacidades otimizadas para cada tema
- Contraste mantido em ambos os modos

## 📁 Arquivos do Sistema

```
src/
├── styles/
│   └── fluid-gradients.css          # Estilos CSS dos gradientes
├── hooks/
│   └── useFluidGradient.ts          # Hook para controle do sistema
├── components/
│   ├── FluidGradientBackground.tsx  # Componente principal
│   └── examples/
│       └── FluidGradientDemo.tsx    # Demonstração (dev only)
```

## 🛠️ Como Usar

### 1. **Configuração Automática**
O sistema já está integrado no `App.tsx`:

```tsx
import FluidGradientBackground from "@/components/FluidGradientBackground";

// No JSX
<FluidGradientBackground />
```

### 2. **Seções Compatíveis**
As seções devem ter os IDs corretos:

```tsx
<section id="perfil">...</section>     // Azul
<section id="projetos">...</section>   // Verde  
<section id="backlog">...</section>    // Roxo
<section id="contato">...</section>    // Rosa
```

### 3. **Hook para Componentes**
Use o hook para reagir às mudanças:

```tsx
import { useCurrentSection } from '@/components/FluidGradientBackground';

const MyComponent = () => {
  const currentSection = useCurrentSection();
  
  return (
    <div className={`section-${currentSection.id}`}>
      Seção atual: {currentSection.displayName}
    </div>
  );
};
```

## 🎨 Personalização

### **Cores dos Gradientes**
Edite `src/styles/fluid-gradients.css`:

```css
/* Seção Perfil - Azul */
.fluid-gradient-container.section-profile {
  background: linear-gradient(
    135deg,
    rgba(59, 130, 246, 0.08) 0%,    /* Azul principal */
    rgba(147, 197, 253, 0.05) 30%,  /* Azul claro */
    rgba(219, 234, 254, 0.03) 60%,  /* Azul muito claro */
    rgba(59, 130, 246, 0.06) 100%   /* Azul médio */
  );
}
```

### **Velocidade das Animações**
Ajuste as durações:

```css
@keyframes fluidProfile {
  /* Mude de 15s para sua preferência */
  animation: fluidProfile 15s ease-in-out infinite;
}
```

### **Detecção de Seções**
Modifique `src/hooks/useFluidGradient.ts`:

```ts
const SECTIONS: SectionConfig[] = [
  { id: 'perfil', className: 'section-profile', threshold: 0.3 },
  { id: 'nova-secao', className: 'section-nova', threshold: 0.3 },
];
```

## 🔧 Configurações Avançadas

### **Performance**
- Throttling automático no scroll
- `requestAnimationFrame` para suavidade
- Redução de movimento respeitada
- Otimização para mobile

### **Acessibilidade**
- Respeita `prefers-reduced-motion`
- Contraste WCAG 2.2 mantido
- Gradientes sutis para não interferir na leitura
- Fallbacks para dispositivos antigos

### **Responsividade**
- Gradientes adaptados para mobile
- Padrões simplificados em telas pequenas
- Performance otimizada para dispositivos baixos

## 🐛 Troubleshooting

### **Gradientes não aparecem**
1. Verifique se o CSS está importado em `index.css`
2. Confirme que `FluidGradientBackground` está no `App.tsx`
3. Verifique os IDs das seções

### **Transições lentas**
1. Reduza a duração das animações CSS
2. Ajuste o threshold no hook
3. Verifique se não há conflitos de CSS

### **Modo escuro não funciona**
1. Confirme que as classes `.dark` estão aplicadas
2. Verifique os gradientes específicos para dark mode
3. Teste a detecção de tema

## 📱 Demonstração

Em desenvolvimento, você verá:
- **Indicador de seção** (canto superior direito)
- **Demo do gradiente** (canto inferior esquerdo)
- **Preview de cores** (canto superior esquerdo)

## 🎯 Benefícios

✅ **UX Moderna**: Transições visuais fluidas  
✅ **Diferenciação**: Cada seção tem identidade visual  
✅ **Performance**: Otimizado para todos os dispositivos  
✅ **Acessibilidade**: WCAG 2.2 compliant  
✅ **Responsivo**: Adapta-se a qualquer tela  
✅ **Manutenível**: Código modular e documentado  

## 🚀 Próximos Passos

1. **Teste** o sistema navegando pelas seções
2. **Personalize** as cores conforme sua marca
3. **Ajuste** as velocidades de animação
4. **Remova** os componentes de debug em produção

---

**💡 Dica**: O sistema funciona melhor com seções de altura suficiente para permitir scroll suave entre elas.
