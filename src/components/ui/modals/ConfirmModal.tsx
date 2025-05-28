/**
 * 🎯 CONFIRM MODAL MODULAR
 * 
 * Modal de confirmação com design system unificado
 * Suporte a diferentes variantes (danger, success, etc.)
 */

import React from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { CTAButton } from '@/components/ui/buttons';
import { useNavigationSounds } from '@/hooks/useSound';
import { BaseModal } from './BaseModal';
import { ConfirmModalProps } from './types';

// Ícones por variante
const variantIcons = {
  primary: Info,
  danger: AlertTriangle,
  success: CheckCircle,
};

// Cores por variante
const variantColors = {
  primary: 'text-blue-600 dark:text-blue-400',
  danger: 'text-red-600 dark:text-red-400',
  success: 'text-green-600 dark:text-green-400',
};

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  confirmVariant = 'primary',
  icon: CustomIcon,
  loading = false,
  ...props
}) => {
  const { t } = useTranslation();
  const { playButtonClick } = useNavigationSounds();

  // Determinar ícone
  const IconComponent = CustomIcon || variantIcons[confirmVariant];
  const iconColor = variantColors[confirmVariant];

  // Handle confirm
  const handleConfirm = () => {
    playButtonClick();
    onConfirm();
  };

  // Handle cancel
  const handleCancel = () => {
    playButtonClick();
    onCancel?.();
    onClose();
  };

  return (
    <BaseModal
      open={open}
      onClose={handleCancel}
      variant={confirmVariant === 'danger' ? 'error' : 'default'}
      size="sm"
      closeOnOverlayClick={!loading}
      closeOnEscape={!loading}
      {...props}
    >
      <div className="text-center">
        {/* Icon */}
        {IconComponent && (
          <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
            <IconComponent className={`w-6 h-6 ${iconColor}`} />
          </div>
        )}

        {/* Title */}
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {title}
          </h3>
        )}

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            {description}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <CTAButton
            onClick={handleCancel}
            variant="ghost"
            size="md"
            disabled={loading}
            className="flex-1"
          >
            {cancelText || t('common.cancel')}
          </CTAButton>

          <CTAButton
            onClick={handleConfirm}
            variant={confirmVariant === 'danger' ? 'danger' : 'primary'}
            size="md"
            loading={loading}
            disabled={loading}
            className="flex-1"
          >
            {confirmText || t('common.confirm')}
          </CTAButton>
        </div>
      </div>
    </BaseModal>
  );
};
