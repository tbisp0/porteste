import React, { memo } from 'react';
import { LucideIcon } from 'lucide-react';

interface MemoizedIconProps {
  Icon: LucideIcon;
  size?: number;
  className?: string;
  'aria-label'?: string;
  style?: React.CSSProperties;
}

/**
 * MemoizedIcon - Componente otimizado para ícones
 * Evita re-renderizações desnecessárias de ícones
 */
const MemoizedIcon = memo<MemoizedIconProps>(({ 
  Icon, 
  size = 24, 
  className = '', 
  'aria-label': ariaLabel,
  style 
}) => {
  return (
    <Icon 
      size={size} 
      className={className}
      aria-label={ariaLabel}
      style={style}
    />
  );
});

MemoizedIcon.displayName = 'MemoizedIcon';

export default MemoizedIcon;
