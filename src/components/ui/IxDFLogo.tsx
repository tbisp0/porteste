import React from 'react';
import { getIxDFLogoPaths } from '@/utils/assetPaths';

interface IxDFLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  layout?: 'horizontal' | 'vertical';
  className?: string;
}

const IxDFLogo: React.FC<IxDFLogoProps> = ({
  size = 'md',
  showText = true,
  layout = 'horizontal',
  className = ''
}) => {
  const logoPaths = getIxDFLogoPaths();
  const sizeClasses = {
    sm: 'h-10',    // 40px - forçando maior para testar
    md: 'h-12',    // 48px - médio
    lg: 'h-16'     // 64px - grande
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const containerClasses = layout === 'vertical'
    ? 'flex flex-col items-center gap-3'
    : 'flex items-center gap-6';

  return (
    <div className={`${containerClasses} ${className}`}>
      {/* Logo IxDF - Usando imagens fornecidas */}
      <div className="relative">
        {/* Logo para Light Mode - usa imagem dark */}
        <img
          src={logoPaths.dark}
          alt="Interaction Design Foundation Logo"
          className={`${sizeClasses[size]} w-auto dark:hidden transition-opacity duration-300 hover:opacity-80`}
          width={size === 'sm' ? '40' : size === 'md' ? '48' : '64'}
          height={size === 'sm' ? '40' : size === 'md' ? '48' : '64'}
          style={{
            height: size === 'sm' ? '40px' : size === 'md' ? '48px' : '64px',
            width: size === 'sm' ? '40px' : size === 'md' ? '48px' : '64px',
            maxHeight: 'none',
            maxWidth: 'none'
          }}
          loading="lazy"
          decoding="async"
        />

        {/* Logo para Dark Mode - usa imagem white */}
        <img
          src={logoPaths.white}
          alt="Interaction Design Foundation Logo"
          className={`${sizeClasses[size]} w-auto hidden dark:block transition-opacity duration-300 hover:opacity-80`}
          width={size === 'sm' ? '40' : size === 'md' ? '48' : '64'}
          height={size === 'sm' ? '40' : size === 'md' ? '48' : '64'}
          style={{
            height: size === 'sm' ? '40px' : size === 'md' ? '48px' : '64px',
            width: size === 'sm' ? '40px' : size === 'md' ? '48px' : '64px',
            maxHeight: 'none',
            maxWidth: 'none'
          }}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Texto explicativo */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-semibold ${textSizeClasses[size]}`}
            style={{ color: 'var(--color-text)' }}
          >
            IxDF
          </span>
          <span
            className={`${textSizeClasses[size]} opacity-75`}
            style={{ color: 'var(--color-muted)' }}
          >
            Interaction Design Foundation
          </span>
        </div>
      )}
    </div>
  );
};

export default IxDFLogo;
