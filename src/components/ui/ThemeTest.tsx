import React from 'react';
import { useTheme } from '../providers/ThemeProvider';

export const ThemeTest: React.FC = () => {
  const { theme, resolvedTheme, isLoading } = useTheme();

  if (isLoading) {
    return <div>Carregando tema...</div>;
  }

  return (
    <div className="p-4 border rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white">
      <h3 className="text-lg font-bold mb-2">Status do Tema</h3>
      <p><strong>Tema selecionado:</strong> {theme}</p>
      <p><strong>Tema resolvido:</strong> {resolvedTheme}</p>
      <p><strong>Classe no HTML:</strong> {document.documentElement.className}</p>
      <div className="mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded">
        <p>Este texto deve mudar de cor conforme o tema</p>
      </div>
    </div>
  );
};

export default ThemeTest;
