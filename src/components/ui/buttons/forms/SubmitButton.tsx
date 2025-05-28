import React from 'react';
import { motion } from 'framer-motion';
import { Send, Check } from 'lucide-react';
import { FormButton } from './FormButton';

interface SubmitButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  success?: boolean;
  className?: string;
  ariaLabel?: string;
  enableSound?: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  success = false,
  className = '',
  ariaLabel,
  enableSound = true
}) => {
  // Animation variants for success state
  const successVariants = {
    initial: { scale: 1 },
    success: { 
      scale: [1, 1.1, 1],
      transition: { duration: 0.5, ease: 'easeInOut' }
    }
  };

  if (success) {
    return (
      <motion.div
        className={`
          inline-flex items-center justify-center gap-2
          px-4 py-2 h-10
          bg-green-600 text-white
          font-medium rounded-lg
          ${className}
        `}
        variants={successVariants}
        initial="initial"
        animate="success"
      >
        <Check className="w-4 h-4" />
        <span>Enviado!</span>
      </motion.div>
    );
  }

  return (
    <FormButton
      type="submit"
      onClick={onClick}
      variant="primary"
      size="md"
      icon={Send}
      iconPosition="left"
      disabled={disabled}
      loading={loading}
      className={className}
      ariaLabel={ariaLabel}
      enableSound={enableSound}
    >
      {children}
    </FormButton>
  );
};
