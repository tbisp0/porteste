import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'subtle' | 'colored';
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  shadow?: boolean;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  variant = 'default',
  blur = 'md',
  border = true,
  shadow = true,
  hover = true
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'strong':
        return 'bg-white/20 dark:bg-black/20';
      case 'subtle':
        return 'bg-white/5 dark:bg-black/5';
      case 'colored':
        return 'bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10';
      default:
        return 'bg-white/10 dark:bg-black/10';
    }
  };

  const getBlurClasses = () => {
    switch (blur) {
      case 'sm':
        return 'backdrop-blur-sm';
      case 'lg':
        return 'backdrop-blur-lg';
      case 'xl':
        return 'backdrop-blur-xl';
      default:
        return 'backdrop-blur-md';
    }
  };

  const baseClasses = cn(
    'relative rounded-xl overflow-hidden',
    getVariantClasses(),
    getBlurClasses(),
    border && 'border border-white/20 dark:border-white/10',
    shadow && 'shadow-lg shadow-black/5 dark:shadow-black/20',
    className
  );

  const hoverAnimation = hover ? {
    scale: 1.02,
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" }
  } : {};

  return (
    <motion.div
      className={baseClasses}
      whileHover={hoverAnimation}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Glass effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 pointer-events-none" />
      
      {/* Subtle border highlight */}
      {border && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" 
             style={{ padding: '1px' }}>
          <div className="w-full h-full rounded-xl bg-transparent" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

// Glass Navigation Component
interface GlassNavProps {
  children: React.ReactNode;
  className?: string;
  position?: 'top' | 'bottom' | 'floating';
}

const GlassNav: React.FC<GlassNavProps> = ({
  children,
  className = '',
  position = 'top'
}) => {
  const positionClasses = {
    top: 'fixed top-0 left-0 right-0 z-50',
    bottom: 'fixed bottom-0 left-0 right-0 z-50',
    floating: 'fixed top-4 left-4 right-4 z-50 rounded-xl'
  };

  return (
    <motion.nav
      className={cn(
        positionClasses[position],
        'bg-white/10 dark:bg-black/10 backdrop-blur-lg border-b border-white/20 dark:border-white/10',
        position === 'floating' && 'border border-white/20 dark:border-white/10 rounded-xl shadow-lg',
        className
      )}
      initial={{ y: position === 'bottom' ? 100 : -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </motion.nav>
  );
};

// Glass Modal Component
interface GlassModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const GlassModal: React.FC<GlassModalProps> = ({
  children,
  isOpen,
  onClose,
  className = ''
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <motion.div
        className={cn(
          'relative bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-auto',
          className
        )}
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 rounded-2xl pointer-events-none" />
        <div className="relative z-10">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { GlassCard, GlassNav, GlassModal };
