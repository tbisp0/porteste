// Buttons - Sistema modular de botões
// Organização similar ao sistema de i18n

// Base/Core Buttons
export { Button, buttonVariants } from './base/Button';
export { default as CTAButton } from './base/CTAButton';
export { EnhancedButton, ProjectCardButton } from './base/EnhancedButton';

// Navigation Buttons
export { default as MobileMenuButton } from './navigation/MobileMenuButton';
export { default as MobileConfigButton } from './navigation/MobileConfigButton';

// System Buttons
export { default as SimpleThemeToggle } from './system/SimpleThemeToggle';
export { default as SoundToggle } from './system/SoundToggle';
export { LanguageSwitcher } from './system/LanguageSwitcher';

// Accessibility Buttons
export { default as AccessibilityButton } from './accessibility/AccessibilityButton';

// Feedback Buttons
export { default as FloatingFeedbackButton } from './feedback/FloatingFeedbackButton';

// Form Buttons
export { FormButton } from './forms/FormButton';
export { SubmitButton } from './forms/SubmitButton';

// Action Buttons
export { ActionButton } from './actions/ActionButton';
export { IconButton } from './actions/IconButton';

// Specialized Buttons
export { BackToTopButton } from './specialized/BackToTopButton';
export { ExpandButton, CollapseButton } from './specialized/ContentButtons';
export { PaginationButton } from './specialized/PaginationButton';

// Types
export type { ButtonProps } from './base/Button';
export type { CTAButtonProps } from './base/CTAButton';
export type { EnhancedButtonProps } from './base/EnhancedButton';

// Re-exports for backward compatibility
export { Button as BaseButton } from './base/Button';
export { default as CTA } from './base/CTAButton';

// Utility exports
export { buttonVariants as getButtonVariants } from './base/Button';
