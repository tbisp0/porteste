import React from 'react';
import { 
  SeoInspiredHeroBackground, 
  SeoInspiredProjectsBackground, 
  SeoInspiredContactBackground,
  EnhancedBackground 
} from '@/components/ui/EnhancedBackground';

/**
 * Examples of how to use the new SEO.ing-inspired background effects
 * These are ADDITIVE to existing background options and preserve all functionality
 */

// Example 1: SEO-Inspired Hero Section
export const SeoInspiredHeroExample: React.FC = () => {
  return (
    <SeoInspiredHeroBackground className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          SEO-Inspired Hero Background
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Subtle floating particles with organic movement, inspired by seo.ing
        </p>
      </div>
    </SeoInspiredHeroBackground>
  );
};

// Example 2: SEO-Inspired Projects Section
export const SeoInspiredProjectsExample: React.FC = () => {
  return (
    <SeoInspiredProjectsBackground className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Projects with SEO-Inspired Background
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Your project cards here */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Project 1</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Project description with organic particle background
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Project 2</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Another project with subtle background effects
            </p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Project 3</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Third project showcasing the background
            </p>
          </div>
        </div>
      </div>
    </SeoInspiredProjectsBackground>
  );
};

// Example 3: SEO-Inspired Contact Section
export const SeoInspiredContactExample: React.FC = () => {
  return (
    <SeoInspiredContactBackground className="py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Contact with SEO-Inspired Background
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Subtle glow effects create a professional atmosphere
        </p>
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </SeoInspiredContactBackground>
  );
};

// Example 4: Using the generic EnhancedBackground with seo-inspired variant
export const GenericSeoInspiredExample: React.FC = () => {
  return (
    <EnhancedBackground
      variant="seo-inspired"
      parallax={true}
      transition="reveal"
      className="py-20"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Generic SEO-Inspired Background
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Using the EnhancedBackground component with seo-inspired variant
        </p>
      </div>
    </EnhancedBackground>
  );
};

// Example 5: Comparison showing both original and SEO-inspired effects
export const ComparisonExample: React.FC = () => {
  return (
    <div>
      {/* Original Enhanced Background */}
      <EnhancedBackground
        variant="hero"
        parallax={true}
        transition="reveal"
        className="py-20 border-b"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Original Enhanced Background</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Animated gradient with floating particles
          </p>
        </div>
      </EnhancedBackground>

      {/* SEO-Inspired Background */}
      <SeoInspiredHeroBackground className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">SEO-Inspired Background</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Subtle organic particles with gentle movement
          </p>
        </div>
      </SeoInspiredHeroBackground>
    </div>
  );
};

// Example 6: Integration with existing ProjectShowcase
export const SeoInspiredProjectShowcaseExample: React.FC = () => {
  return (
    <SeoInspiredProjectsBackground className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Projects with SEO-Inspired Background
        </h2>
        {/* 
          Here you would use your existing ProjectShowcase component:
          <ProjectShowcase projects={projects} />
          
          The SEO-inspired background will work seamlessly with all existing components
        */}
        <div className="text-center text-gray-600 dark:text-gray-300">
          <p>Your existing ProjectShowcase component would go here</p>
          <p>All functionality preserved, with new subtle background effects</p>
        </div>
      </div>
    </SeoInspiredProjectsBackground>
  );
};

export default {
  SeoInspiredHeroExample,
  SeoInspiredProjectsExample,
  SeoInspiredContactExample,
  GenericSeoInspiredExample,
  ComparisonExample,
  SeoInspiredProjectShowcaseExample,
};
