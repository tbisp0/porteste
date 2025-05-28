import React from 'react';
import { useParallax, useSectionTransition } from '../../hooks/useParallax';

interface EnhancedBackgroundProps {
  children: React.ReactNode;
  variant?: 'hero' | 'projects' | 'contact' | 'seo-inspired' | 'default';
  parallax?: boolean;
  transition?: 'reveal' | 'wave' | 'diagonal' | 'none';
  className?: string;
}

export const EnhancedBackground: React.FC<EnhancedBackgroundProps> = ({
  children,
  variant = 'default',
  parallax = false,
  transition = 'none',
  className = '',
}) => {
  const parallaxRef = useParallax({ speed: 0.3, disabled: !parallax });
  const transitionRef = useSectionTransition();

  const getBackgroundClass = () => {
    switch (variant) {
      case 'hero':
        return 'hero-enhanced-bg';
      case 'projects':
        return 'projects-enhanced-bg';
      case 'contact':
        return 'contact-enhanced-bg';
      case 'seo-inspired':
        // Determine which SEO-inspired variant to use based on context
        // Default to hero variant, but can be customized
        return 'hero-seo-inspired-bg';
      default:
        return '';
    }
  };

  const getTransitionClass = () => {
    switch (transition) {
      case 'reveal':
        return 'section-reveal';
      case 'wave':
        return 'section-wave';
      case 'diagonal':
        return 'section-diagonal';
      default:
        return '';
    }
  };

  const containerClasses = `
    ${getBackgroundClass()}
    ${parallax ? 'parallax-container' : ''}
    ${transition !== 'none' ? 'section-transition' : ''}
    ${getTransitionClass()}
    ${className}
  `;

  return (
    <section
      ref={transition !== 'none' ? transitionRef : parallax ? parallaxRef : undefined}
      className={containerClasses}
    >
      {parallax && (
        <div className="parallax-bg" ref={parallaxRef}>
          {/* Parallax background content can be added here */}
        </div>
      )}

      <div className={parallax ? 'parallax-content' : ''}>
        {children}
      </div>
    </section>
  );
};

// Specific background components for each section
export const HeroBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <EnhancedBackground
    variant="hero"
    parallax={true}
    transition="reveal"
    className={className}
  >
    {children}
  </EnhancedBackground>
);

export const ProjectsBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <EnhancedBackground
    variant="projects"
    parallax={true}
    transition="wave"
    className={className}
  >
    {children}
  </EnhancedBackground>
);

export const ContactBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <EnhancedBackground
    variant="contact"
    parallax={false}
    transition="diagonal"
    className={className}
  >
    {children}
  </EnhancedBackground>
);

// SEO-Inspired Background Components (NEW)
export const SeoInspiredHeroBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`hero-seo-inspired-bg ${className}`}>
    {children}
  </div>
);

export const SeoInspiredProjectsBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`projects-seo-inspired-bg ${className}`}>
    {children}
  </div>
);

export const SeoInspiredContactBackground: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`contact-seo-inspired-bg ${className}`}>
    {children}
  </div>
);

// SVG Background Patterns Component
export const SVGBackgroundPattern: React.FC<{
  pattern: 'dots' | 'waves' | 'grid' | 'organic';
  opacity?: number;
  color?: string;
}> = ({ pattern, opacity = 0.1, color = 'currentColor' }) => {
  const renderPattern = () => {
    switch (pattern) {
      case 'dots':
        return (
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="2" fill={color} opacity={opacity} />
          </svg>
        );

      case 'waves':
        return (
          <svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 10 Q25 0 50 10 T100 10 V20 H0 Z"
              fill={color}
              opacity={opacity}
            />
          </svg>
        );

      case 'grid':
        return (
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 0h40v40H0z"
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity={opacity}
            />
          </svg>
        );

      case 'organic':
        return (
          <svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M40 10 C60 10 70 20 70 40 C70 60 60 70 40 70 C20 70 10 60 10 40 C10 20 20 10 40 10 Z"
              fill="none"
              stroke={color}
              strokeWidth="1"
              opacity={opacity}
            />
          </svg>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          renderPattern()?.outerHTML || ''
        )}")`,
        backgroundRepeat: 'repeat',
      }}
    />
  );
};

export default EnhancedBackground;
