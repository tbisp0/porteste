import { useEffect, useCallback } from 'react';

interface AccessibilityOptions {
  skipToContent?: boolean;
  focusVisible?: boolean;
  ariaAnnouncer?: boolean;
}

export const useAccessibility = ({
  skipToContent = true,
  focusVisible = true,
  ariaAnnouncer = true,
}: AccessibilityOptions = {}) => {
  // Handle keyboard navigation
  const handleFirstTab = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      document.body.classList.add('user-is-tabbing');
      window.removeEventListener('keydown', handleFirstTab);
    }
  }, []);

  // Announce messages to screen readers
  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcer = document.getElementById('aria-announcer');
    if (announcer) {
      announcer.setAttribute('aria-live', priority);
      announcer.textContent = message;
      // Clear after 3 seconds
      setTimeout(() => {
        announcer.textContent = '';
      }, 3000);
    }
  }, []);

  useEffect(() => {
    // Setup keyboard navigation detection
    if (focusVisible) {
      window.addEventListener('keydown', handleFirstTab);
    }

    // Create skip to content link
    if (skipToContent) {
      const skipLink = document.createElement('a');
      skipLink.href = '#main-content';
      skipLink.className = 'skip-to-content';
      skipLink.textContent = 'Pular para o conteúdo principal';
      document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Create ARIA live region
    if (ariaAnnouncer) {
      const announcer = document.createElement('div');
      announcer.id = 'aria-announcer';
      announcer.className = 'sr-only';
      announcer.setAttribute('aria-live', 'polite');
      document.body.appendChild(announcer);
    }

    // Add necessary styles
    const style = document.createElement('style');
    style.textContent = `
      .skip-to-content {
        position: absolute;
        top: -40px;
        left: 0;
        background: var(--color-primary);
        color: white;
        padding: 8px;
        z-index: 100;
        transition: top 0.3s;
      }
      
      .skip-to-content:focus {
        top: 0;
      }
      
      .user-is-tabbing *:focus {
        outline: 2px solid var(--color-primary) !important;
        outline-offset: 2px !important;
      }
      
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup
      if (focusVisible) {
        window.removeEventListener('keydown', handleFirstTab);
      }
      if (skipToContent) {
        document.querySelector('.skip-to-content')?.remove();
      }
      if (ariaAnnouncer) {
        document.getElementById('aria-announcer')?.remove();
      }
      document.body.classList.remove('user-is-tabbing');
    };
  }, [skipToContent, focusVisible, ariaAnnouncer, handleFirstTab]);

  return {
    announce,
  };
};
