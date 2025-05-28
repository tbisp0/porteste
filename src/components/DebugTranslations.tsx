import React from 'react';
import { useTranslation } from 'react-i18next';

const DebugTranslations: React.FC = () => {
  const { t, i18n } = useTranslation();

  if (import.meta.env.PROD) {
    return null; // Não mostrar em produção
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.8)',
      color: 'white',
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4>🐛 Debug Translations</h4>
      <p><strong>Language:</strong> {i18n.language}</p>
      <p><strong>Ready:</strong> {i18n.isInitialized ? '✅' : '❌'}</p>
      <p><strong>Profile Title:</strong> {t('profile.title')}</p>
      <p><strong>Projects Title:</strong> {t('projects.title')}</p>
      <p><strong>Navigation Profile:</strong> {t('navigation.profile')}</p>
      <p><strong>FGV Law Title:</strong> {t('projects.fgvLaw.title')}</p>
    </div>
  );
};

export default DebugTranslations;
