import React, { createContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Settings {
  language: string;
  animations: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  language: 'pt-BR',
  animations: true,
  highContrast: false,
  reducedMotion: false,
  fontSize: 'medium',
};

export const SettingsContext = createContext<SettingsContextType>({
  settings: defaultSettings,
  updateSettings: () => {},
  resetSettings: () => {},
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  
  // Initialize settings from localStorage or defaults
  const [settings, setSettings] = useState<Settings>(() => {
    const savedSettings = localStorage.getItem('userSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });
  
  // Apply settings whenever they change
  useEffect(() => {
    // Apply language
    if (i18n.language !== settings.language) {
      i18n.changeLanguage(settings.language);
    }
    
    // Apply high contrast
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    
    // Apply reduced motion
    document.documentElement.classList.toggle('reduce-motion', settings.reducedMotion);
    
    // Apply font size
    document.documentElement.dataset.fontSize = settings.fontSize;
    
    // Save to localStorage
    localStorage.setItem('userSettings', JSON.stringify(settings));
  }, [settings, i18n]);
  
  // Listen for prefers-reduced-motion changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = () => {
      if (mediaQuery.matches && !settings.reducedMotion) {
        setSettings(prev => ({ ...prev, reducedMotion: true }));
      }
    };
    
    // Set initial value based on system preference
    if (mediaQuery.matches && !settings.reducedMotion) {
      setSettings(prev => ({ ...prev, reducedMotion: true }));
    }
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [settings.reducedMotion]);
  
  // Update settings function
  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };
  
  // Reset settings function
  const resetSettings = () => {
    setSettings(defaultSettings);
  };
  
  return (
    <SettingsContext.Provider value={{ settings, updateSettings, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};