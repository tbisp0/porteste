import { useCallback, useContext, useEffect } from 'react';
import { ThemeContext, type ThemeMode } from '../app/providers/ThemeContext';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  const { theme, setTheme, resolvedTheme } = context;
  
  // Update meta theme color
  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', resolvedTheme === 'dark' ? '#121212' : '#ffffff');
    }
  }, [resolvedTheme]);
  
  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [resolvedTheme, setTheme]);
  
  // Set specific theme mode
  const setMode = useCallback((mode: ThemeMode) => {
    setTheme(mode);
  }, [setTheme]);
  
  return {
    theme,
    resolvedTheme,
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    isSystem: theme === 'system',
    toggleTheme,
    setMode,
  };
};
