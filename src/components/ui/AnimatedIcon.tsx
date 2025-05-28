import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  children: React.ReactNode;
  animation?: 'scale' | 'rotate' | 'bounce' | 'pulse' | 'shake' | 'float' | 'flip';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  hoverColor?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  children,
  animation = 'scale',
  className = '',
  size = 'md',
  color,
  hoverColor,
  disabled = false,
  onClick
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10'
  };

  const getAnimation = () => {
    switch (animation) {
      case 'scale':
        return {
          whileHover: { scale: 1.2 },
          whileTap: { scale: 0.9 }
        };
      case 'rotate':
        return {
          whileHover: { rotate: 360 },
          whileTap: { scale: 0.9 }
        };
      case 'bounce':
        return {
          whileHover: {
            y: [-2, -8, -2],
            transition: { duration: 0.3, ease: "easeOut" }
          },
          whileTap: { scale: 0.9 }
        };
      case 'pulse':
        return {
          whileHover: {
            scale: [1, 1.1, 1],
            transition: { duration: 0.6, repeat: Infinity }
          },
          whileTap: { scale: 0.9 }
        };
      case 'shake':
        return {
          whileHover: {
            x: [-2, 2, -2, 2, 0],
            transition: { duration: 0.4 }
          },
          whileTap: { scale: 0.9 }
        };
      case 'float':
        return {
          whileHover: {
            y: [-2, -6, -2],
            transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          },
          whileTap: { scale: 0.9 }
        };
      case 'flip':
        return {
          whileHover: { rotateY: 180 },
          whileTap: { scale: 0.9 }
        };
      default:
        return {
          whileHover: { scale: 1.1 },
          whileTap: { scale: 0.9 }
        };
    }
  };

  return (
    <motion.div
      className={cn(
        'inline-flex items-center justify-center cursor-pointer transition-colors duration-200',
        sizeClasses[size],
        disabled && 'opacity-50 cursor-not-allowed',
        onClick && 'cursor-pointer',
        className
      )}
      style={{
        color: color || 'currentColor',
        '--hover-color': hoverColor || 'currentColor'
      }}
      {...(!disabled && getAnimation())}
      onClick={disabled ? undefined : onClick}
      whileHover={!disabled ? {
        ...getAnimation().whileHover,
        color: hoverColor || 'var(--hover-color)'
      } : undefined}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Social Media Icons with specific animations
interface SocialIconProps {
  platform: 'linkedin' | 'github' | 'behance' | 'dribbble' | 'twitter' | 'instagram';
  href?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({
  platform,
  href,
  size = 'md',
  className = ''
}) => {
  const platformAnimations = {
    linkedin: 'bounce',
    github: 'rotate',
    behance: 'scale',
    dribbble: 'pulse',
    twitter: 'shake',
    instagram: 'float'
  } as const;

  const platformColors = {
    linkedin: '#0077B5',
    github: '#333',
    behance: '#1769FF',
    dribbble: '#EA4C89',
    twitter: '#1DA1F2',
    instagram: '#E4405F'
  };

  const content = (
    <AnimatedIcon
      animation={platformAnimations[platform]}
      size={size}
      color="currentColor"
      hoverColor={platformColors[platform]}
      className={className}
    >
      {/* Icon content would go here - using a placeholder */}
      <div className="w-full h-full bg-current rounded" />
    </AnimatedIcon>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {content}
      </a>
    );
  }

  return content;
};

// Interactive Button with Icon
interface IconButtonProps {
  icon: React.ReactNode;
  label?: string;
  animation?: 'scale' | 'rotate' | 'bounce' | 'pulse' | 'shake' | 'float' | 'flip';
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  animation = 'scale',
  variant = 'default',
  size = 'md',
  className = '',
  onClick,
  disabled = false
}) => {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground'
  };

  const sizeClasses = {
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4'
  };

  return (
    <motion.button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.05 } : undefined}
      whileTap={!disabled ? { scale: 0.95 } : undefined}
    >
      <AnimatedIcon animation={animation} size={size}>
        {icon}
      </AnimatedIcon>
      {label && <span className="text-sm">{label}</span>}
    </motion.button>
  );
};

export { AnimatedIcon, SocialIcon, IconButton };
