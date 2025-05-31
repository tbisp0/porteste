import React from 'react';
import { Link } from 'react-router-dom';
import { FadeInView } from '@/components/animations/FadeInView';
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Links de navegação
  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Projetos', path: '/projects' },
    { name: 'Sobre', path: '/about' },
    { name: 'Contato', path: '/contact' },
  ];

  // Links de redes sociais
  const socialLinks = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/tarcisiobispo' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://linkedin.com/in/tarcisiobispo' },
    { name: 'Twitter', icon: 'twitter', url: 'https://twitter.com/tarcisiobispo' },
  ];
  return (
    <footer role="contentinfo" className="bg-gray-100 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <FadeInView>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo e informações */}
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="text-2xl font-bold text-primary mb-4 inline-block">
                Tarcisio Bispo
              </Link>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Product Designer & Full-Stack Developer especializado em experiências digitais acessíveis e de alta performance.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors"
                    aria-label={link.name}
              >
                    <span className="sr-only">{link.name}</span>
                    <i className={`fab fa-${link.icon} text-xl`} aria-hidden="true"></i>
              </a>
                ))}
            </div>
          </div>
          
            {/* Links de navegação */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Navegação</h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors"
            >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
          </div>

            {/* Contato */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Contato</h3>
              <address className="not-italic">
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  Email: <a href="mailto:contato@tarcisiobispo.dev" className="hover:text-primary dark:hover:text-primary transition-colors">contato@tarcisiobispo.dev</a>
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Localização: São Paulo, Brasil
                </p>
              </address>
      </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300 text-center md:text-left mb-4 md:mb-0">
              &copy; {currentYear} Tarcisio Bispo. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="/privacy" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                Política de Privacidade
              </a>
              <a href="/terms" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </FadeInView>
      </div>
    </footer>
  );
};

export default Footer;
