import { useEffect, useState, useCallback } from 'react';
import { User, Folder, Repeat, Mail, MessageCircle, Menu, X } from 'lucide-react';

const navItems = [
  { href: '#perfil', icon: User, sectionId: 'perfil', i18nKey: 'navigation.profile' },
  { href: '#projetos', icon: Folder, sectionId: 'projetos', i18nKey: 'navigation.projects' },
  { href: '#backlog', icon: Repeat, sectionId: 'backlog', i18nKey: 'navigation.backlog' },
  { href: '#contato', icon: Mail, sectionId: 'contato', i18nKey: 'navigation.contact' },
];

// Componente mobile funcional
const MobileNavigationMenu = ({ isOpen, onClose, activeSection, onNavigate, items }: any) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-4">
            {items.map((item: any) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(item.sectionId);
                  onClose();
                }}
                className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                  activeSection === item.sectionId
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span>{item.text}</span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('perfil');
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      // Detecta a seção ativa com base no scroll
      let found = 'perfil';
      for (const item of navItems) {
        const el = document.getElementById(item.sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = item.sectionId;
            break;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 70,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  }, []);

  const handleMobileNavigation = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 70,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
    }
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-gray-200 dark:border-gray-700
        ${scrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur'}
      `}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        {/* Logo */}
        <a href="#perfil" className="hidden md:flex items-center gap-2 text-2xl font-bold tracking-tight text-blue-600">
          <span className="rounded bg-blue-600 text-white px-2 py-1 text-lg font-black shadow-sm">TBA</span>
        </a>

        {/* Navegação Desktop */}
        <ul className="hidden md:flex gap-8 items-end">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeSection === item.sectionId;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={e => handleNavClick(e, item.sectionId)}
                  className={`flex flex-col items-center px-3 py-2 transition-colors ${
                    isActive ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300 hover:text-blue-600'
                  }`}
                >
                  <Icon className="mb-1 w-5 h-5" />
                  <span className="text-sm font-medium">
                    {item.sectionId === 'perfil' && 'Perfil'}
                    {item.sectionId === 'projetos' && 'Projetos'}
                    {item.sectionId === 'backlog' && 'Backlog'}
                    {item.sectionId === 'contato' && 'Contato'}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-blue-600"></div>
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Ações */}
        <div className="flex gap-2 items-center">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center justify-center w-11 h-11 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex gap-2 items-center">
            <button
              onClick={() => setFeedbackOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow hover:shadow-lg transition-all text-blue-600"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <MobileNavigationMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeSection={activeSection}
        onNavigate={handleMobileNavigation}
        items={[
          {
            id: 'perfil',
            sectionId: 'perfil',
            text: 'Perfil',
            href: '#perfil',
            icon: <User className="w-5 h-5" />
          },
          {
            id: 'projetos',
            sectionId: 'projetos',
            text: 'Projetos',
            href: '#projetos',
            icon: <Folder className="w-5 h-5" />
          },
          {
            id: 'backlog',
            sectionId: 'backlog',
            text: 'Backlog',
            href: '#backlog',
            icon: <Repeat className="w-5 h-5" />
          },
          {
            id: 'contato',
            sectionId: 'contato',
            text: 'Contato',
            href: '#contato',
            icon: <Mail className="w-5 h-5" />
          }
        ]}
      />

      {/* Feedback Modal Placeholder */}
      {feedbackOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center" onClick={() => setFeedbackOpen(false)}>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Feedback</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Modal de feedback funcionando!</p>
            <button
              onClick={() => setFeedbackOpen(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
