import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { useBreakpoint } from '@/hooks/useBreakpoint';
import { useAudio } from '@/hooks/useAudio';
import { useLanguage } from '@/hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Globe, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';

// Tipos
type NavLink = {
  name: string;
  path: string;
};

interface HeaderProps {
  transparent?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ transparent = false }) => {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { isMobile } = useBreakpoint();
  const location = useLocation();
  


  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  



























  // Monitorar scroll para transparência
  useEffect(() => {





    const handleScroll = () => {

      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fechar menu ao navegar
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Impedir scroll quando menu estiver aberto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  // Classes para o cabeçalho
  const headerClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${scrolled || !transparent ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'}
  `;

  // Variantes para animação do menu
  const menuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Links de navegação com tradução
  const navLinks: NavLink[] = [
    { name: t('navigation.home') || 'Home', path: '/' },
    { name: t('navigation.projects') || 'Projects', path: '/projects' },
    { name: t('navigation.about') || 'About', path: '/about' },
    { name: t('navigation.contact') || 'Contact', path: '/contact' },
  ];
  
  // Controles de áudio
  const { muted, toggleMute } = useAudio();
  
  // Controles de idioma
  const { currentLanguage, changeLanguage, languageOptions } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const languageDropdownRef = useRef<HTMLDivElement>(null);
  
  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target as Node)) {
        setShowLanguageDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header role="banner" className={headerClasses}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Tarcisio Bispo
        </Link>

        {/* Navegação Desktop */}
        {!isMobile && (
          <nav role="navigation" className="flex items-center space-x-8">
            <ul className="flex space-x-6">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`
                      py-2 text-lg transition-colors
                      ${location.pathname === link.path
                        ? 'text-primary font-medium'
                        : 'text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Controles de idioma */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Alterar idioma"
                aria-expanded={showLanguageDropdown}
              >
                <Globe className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {showLanguageDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code as any);
                          setShowLanguageDropdown(false);
                        }}
                        className={cn(
                          'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                          currentLanguage === lang.code ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
                        )}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Botão de som */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={muted ? 'Ativar som' : 'Desativar som'}
            >
              {muted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            
            {/* Botão de tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </nav>
        )}

        {/* Botão do menu mobile */}
        {isMobile && (
          <div className="flex items-center space-x-2">
            {/* Controles de idioma */}
            <div className="relative" ref={languageDropdownRef}>
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Alterar idioma"
                aria-expanded={showLanguageDropdown}
              >
                <Globe className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {showLanguageDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50"
                  >
                    {languageOptions.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code as any);
                          setShowLanguageDropdown(false);
                        }}
                        className={cn(
                          'w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                          currentLanguage === lang.code ? 'bg-gray-100 dark:bg-gray-700 font-medium' : ''
                        )}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Botão de som */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={muted ? 'Ativar som' : 'Desativar som'}
            >
              {muted ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            
            {/* Botão de tema */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-gray-800 dark:bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-gray-800 dark:bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-gray-800 dark:bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobile && menuOpen && (
          <motion.nav
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-lg"
          >
            <ul className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`
                      block py-3 px-4 text-xl rounded-md transition-colors
                      ${location.pathname === link.path
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
