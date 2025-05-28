// Configurações de Analytics
export const ANALYTICS_CONFIG = {
  // Google Tag Manager ID
  GTM_ID: 'GTM-M2NFRBD9',
  
  // Habilitar analytics apenas em produção
  ENABLED: import.meta.env.PROD,
  
  // Configurações de eventos
  EVENTS: {
    // Navegação
    PAGE_VIEW: 'page_view',
    NAVIGATION: 'navigation',
    
    // Interações do usuário
    BUTTON_CLICK: 'button_click',
    FORM_SUBMIT: 'form_submit',
    DOWNLOAD: 'download',
    EXTERNAL_LINK: 'external_link',
    
    // Portfolio específico
    PROJECT_VIEW: 'project_view',
    CONTACT_FORM: 'contact_form_submit',
    CV_DOWNLOAD: 'cv_download',
    SOCIAL_CLICK: 'social_media_click',
    
    // Acessibilidade
    ACCESSIBILITY_TOGGLE: 'accessibility_toggle',
    THEME_CHANGE: 'theme_change',
    LANGUAGE_CHANGE: 'language_change',
    
    // Performance
    PERFORMANCE_METRIC: 'performance_metric',
    ERROR: 'error',
  },
  
  // Categorias de eventos
  CATEGORIES: {
    ENGAGEMENT: 'engagement',
    NAVIGATION: 'navigation',
    PORTFOLIO: 'portfolio',
    ACCESSIBILITY: 'accessibility',
    PERFORMANCE: 'performance',
    ERROR: 'error',
  },
} as const;

// Tipos para eventos
export interface GTMEvent {
  event: string;
  event_category?: string;
  event_label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

// Helper para criar eventos padronizados
export const createGTMEvent = (
  eventName: string,
  category?: string,
  label?: string,
  value?: number,
  customParams?: Record<string, any>
): GTMEvent => ({
  event: eventName,
  event_category: category,
  event_label: label,
  value,
  custom_parameters: customParams,
});

// Eventos pré-definidos para o portfolio
export const PORTFOLIO_EVENTS = {
  // Navegação
  navigateToSection: (section: string) => createGTMEvent(
    ANALYTICS_CONFIG.EVENTS.NAVIGATION,
    ANALYTICS_CONFIG.CATEGORIES.NAVIGATION,
    section
  ),
  
  // Projetos
  viewProject: (projectName: string) => createGTMEvent(
    ANALYTICS_CONFIG.EVENTS.PROJECT_VIEW,
    ANALYTICS_CONFIG.CATEGORIES.PORTFOLIO,
    projectName
  ),
  
  // Contato
  submitContactForm: (formType: string) => createGTMEvent(
    ANALYTICS_CONFIG.EVENTS.CONTACT_FORM,
    ANALYTICS_CONFIG.CATEGORIES.ENGAGEMENT,
    formType
  ),
  
  // Downloads
  downloadCV: () => createGTMEvent(
    ANALYTICS_CONFIG.EVENTS.CV_DOWNLOAD,
    ANALYTICS_CONFIG.CATEGORIES.ENGAGEMENT,
    'curriculum_vitae'
  ),
  
  // Redes sociais
  clickSocialMedia: (platform: string) => createGTMEvent(
    ANALYTICS_CONFIG.EVENTS.SOCIAL_CLICK,
    ANALYTICS_CONFIG.CATEGORIES.ENGAGEMENT,
    platform
  ),
  
  // Acessibilidade
  toggleAccessibility: (feature: string, enabled: boolean) => createGTMEvent(
    ANALYTICS_CONFIG.EVENTS.ACCESSIBILITY_TOGGLE,
    ANALYTICS_CONFIG.CATEGORIES.ACCESSIBILITY,
    feature,
    enabled ? 1 : 0
  ),
  
  // Tema
  changeTheme: (theme: string) => createGTMEvent(
    ANALYTICS_CONFIG.EVENTS.THEME_CHANGE,
    ANALYTICS_CONFIG.CATEGORIES.ACCESSIBILITY,
    theme
  ),
  
  // Idioma
  changeLanguage: (language: string) => createGTMEvent(
    ANALYTICS_CONFIG.EVENTS.LANGUAGE_CHANGE,
    ANALYTICS_CONFIG.CATEGORIES.ACCESSIBILITY,
    language
  ),
};
