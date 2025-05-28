import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTranslation } from 'react-i18next';
import { MobileMenuButton } from '../ui/buttons';
import MobileNavigationMenu from '../ui/MobileNavigationMenu';

// Mock the hooks
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navigation.menu.open': 'Open navigation menu',
        'navigation.menu.close': 'Close navigation menu',
        'navigation.menu.toggle': 'Navigation Menu',
        'navigation.profile': 'Profile',
        'navigation.projects': 'Projects',
        'navigation.backlog': 'Backlog',
        'navigation.contact': 'Contact',
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock('@/hooks/useSound', () => ({
  useNavigationSounds: () => ({
    playButtonHover: vi.fn(),
    playButtonClick: vi.fn(),
    playPageTransition: vi.fn(),
  }),
}));

vi.mock('@/hooks/useAnalytics', () => ({
  useAnalytics: () => ({
    trackNavigation: vi.fn(),
  }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    button: React.forwardRef<HTMLButtonElement, any>(({ children, ...props }, ref) => (
      <button ref={ref} {...props}>{children}</button>
    )),
    div: React.forwardRef<HTMLDivElement, any>(({ children, ...props }, ref) => (
      <div ref={ref} {...props}>{children}</div>
    )),
    span: React.forwardRef<HTMLSpanElement, any>(({ children, ...props }, ref) => (
      <span ref={ref} {...props}>{children}</span>
    )),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Mock Sheet components
vi.mock('../ui/sheet', () => ({
  Sheet: ({ children, open }: { children: React.ReactNode; open: boolean }) =>
    open ? <div data-testid="sheet">{children}</div> : null,
  SheetContent: ({ children }: { children: React.ReactNode }) =>
    <div data-testid="sheet-content">{children}</div>,
  SheetHeader: ({ children }: { children: React.ReactNode }) =>
    <div data-testid="sheet-header">{children}</div>,
  SheetTitle: ({ children }: { children: React.ReactNode }) =>
    <h2 data-testid="sheet-title">{children}</h2>,
}));

describe('Mobile Navigation Components', () => {
  describe('MobileMenuButton', () => {
    it('renders with correct accessibility attributes when closed', () => {
      const mockOnClick = vi.fn();

      render(
        <MobileMenuButton
          isOpen={false}
          onClick={mockOnClick}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Open navigation menu');
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-controls', 'mobile-navigation-menu');
    });

    it('renders with correct accessibility attributes when open', () => {
      const mockOnClick = vi.fn();

      render(
        <MobileMenuButton
          isOpen={true}
          onClick={mockOnClick}
        />
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Close navigation menu');
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('calls onClick when clicked', () => {
      const mockOnClick = vi.fn();

      render(
        <MobileMenuButton
          isOpen={false}
          onClick={mockOnClick}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('MobileNavigationMenu', () => {
    const defaultProps = {
      isOpen: true,
      onClose: vi.fn(),
      activeSection: 'perfil',
      onNavigate: vi.fn(),
    };

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('renders navigation items when open', () => {
      render(<MobileNavigationMenu {...defaultProps} />);

      expect(screen.getByTestId('sheet')).toBeInTheDocument();
      expect(screen.getByText('Navigation Menu')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Projects')).toBeInTheDocument();
      expect(screen.getByText('Backlog')).toBeInTheDocument();
      expect(screen.getByText('Contact')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
      render(<MobileNavigationMenu {...defaultProps} isOpen={false} />);

      expect(screen.queryByTestId('sheet')).not.toBeInTheDocument();
    });

    it('calls onNavigate and onClose when navigation item is clicked', async () => {
      const mockOnNavigate = vi.fn();
      const mockOnClose = vi.fn();

      render(
        <MobileNavigationMenu
          {...defaultProps}
          onNavigate={mockOnNavigate}
          onClose={mockOnClose}
        />
      );

      const profileLink = screen.getByText('Profile');
      fireEvent.click(profileLink);

      await waitFor(() => {
        expect(mockOnNavigate).toHaveBeenCalledWith('perfil');
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });

    it('highlights active section', () => {
      render(<MobileNavigationMenu {...defaultProps} activeSection="projetos" />);

      const projectsLink = screen.getByText('Projects');
      expect(projectsLink.closest('a')).toHaveAttribute('aria-current', 'page');
    });
  });
});
