import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '@/hooks/useTheme';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  headerTransparent?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  headerTransparent = false,
}) => {
  const { theme } = useTheme();
  
  // Atualizar título da página
  React.useEffect(() => {
    if (title) {
      document.title = `${title} | Tarcisio Bispo`;
    }
  }, [title]);
  
  // Atualizar meta description
  React.useEffect(() => {
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [description]);
  
  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:p-4 focus:block focus:bg-primary text-white">
        Pular para o conteúdo principal
      </a>
      
      <Header transparent={headerTransparent} />
      
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout;