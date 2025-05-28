import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useContextualToast } from '@/hooks/useContextualToast';
import { useNavigationSounds } from '@/hooks/useSound';

type ThemeOption = 'light' | 'dark' | 'system';

const THEME_OPTIONS: Array<{
  value: ThemeOption;
  icon: React.ComponentType<{ className?: string }>;
  labelKey: string;
}> = [
  { value: 'light', icon: Sun, labelKey: 'theme.light' },
  { value: 'dark', icon: Moon, labelKey: 'theme.dark' },
  { value: 'system', icon: Monitor, labelKey: 'theme.system' },
];

export const ThemeToggle: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const { theme, setTheme, resolvedTheme, isLoading } = useTheme();
  const { t } = useTranslation();
  const { showToast } = useContextualToast();
  const { playButtonHover, playButtonClick } = useNavigationSounds();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  // Se ainda está carregando, não renderiza
  if (isLoading) {
    return (
      <div className="w-10 h-10 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] animate-pulse" />
    );
  }

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  // Acessibilidade: navegação por teclado
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!open) return;

      switch (e.key) {
        case 'Escape':
          setOpen(false);
          buttonRef.current?.focus();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex(prev => (prev + 1) % THEME_OPTIONS.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex(prev => prev <= 0 ? THEME_OPTIONS.length - 1 : prev - 1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0) {
            handleThemeSelect(THEME_OPTIONS[focusedIndex].value);
          }
          break;
      }
    }

    if (open) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, focusedIndex]);

  // Função para selecionar tema
  const handleThemeSelect = (newTheme: ThemeOption) => {
    try {
      setTheme(newTheme);
      setOpen(false);
      setFocusedIndex(-1);

      // Play click sound
      playButtonClick();

      // Feedback visual com toast contextual abaixo do botão
      const selectedOption = THEME_OPTIONS.find(option => option.value === newTheme);
      if (selectedOption && buttonRef.current) {
        showToast(buttonRef.current, {
          message: t(selectedOption.labelKey),
          description: t('theme.changed'),
          type: 'success',
          duration: 1500, // Duração reduzida para maior proximidade
        });
      }
    } catch (error) {
      console.error('Erro ao alterar tema:', error);
      setOpen(false);
    }
  };

  // Obtém o ícone atual
  const getCurrentIcon = () => {
    const currentOption = THEME_OPTIONS.find(option => option.value === theme);
    return currentOption ? currentOption.icon : Sun;
  };

  const CurrentIcon = getCurrentIcon();

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('theme.select')}
        title={t('theme.select')}
        onClick={() => {
          setOpen(v => !v);
          setFocusedIndex(-1);
          playButtonClick();
        }}
        onMouseEnter={() => playButtonHover()}
        tabIndex={0}
        className="transition-all duration-300 flex items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] w-10 h-10 text-[var(--color-primary)] hover:scale-105"
        style={{ color: 'var(--color-primary)' }}
      >
        <span className="sr-only">{t('theme.toggle')}</span>
        <CurrentIcon
          className="w-5 h-5 transition-transform duration-300"
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          ref={menuRef}
          className="absolute right-0 mt-2 w-40 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg z-50 py-1 animate-fade-in"
          role="listbox"
          tabIndex={-1}
        >
          {THEME_OPTIONS.map((option, index) => {
            const OptionIcon = option.icon;
            return (
              <li key={option.value}>
                <button
                  className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors duration-200 focus:outline-none focus:bg-[var(--color-primary)]/10 focus:text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 hover:text-[var(--color-primary)] ${
                    theme === option.value ? 'font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'text-[var(--color-link)]'
                  } ${
                    focusedIndex === index ? 'bg-[var(--color-primary)]/10 text-[var(--color-primary)]' : ''
                  }`}
                  role="option"
                  aria-selected={theme === option.value}
                  onClick={() => handleThemeSelect(option.value)}
                  onMouseEnter={() => playButtonHover()}
                  tabIndex={-1}
                >
                  <OptionIcon className="w-4 h-4" aria-hidden="true" />
                  <span className="font-medium">{t(option.labelKey)}</span>
                  {theme === option.value && (
                    <span className="ml-auto text-xs text-[var(--color-primary)]">✓</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ThemeToggle;
