import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const useSEO = ({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  author = 'Tarcísio Bispo',
  publishedTime,
  modifiedTime,
}: SEOProps) => {
  useEffect(() => {
    // Basic Meta Tags
    document.title = `${title} | Tarcísio Bispo`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[name="keywords"]')?.setAttribute('content', keywords.join(', '));

    // Open Graph
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', type);
    if (image) {
      document.querySelector('meta[property="og:image"]')?.setAttribute('content', image);
    }
    if (url) {
      document.querySelector('meta[property="og:url"]')?.setAttribute('content', url);
    }

    // Twitter Card
    document.querySelector('meta[name="twitter:card"]')?.setAttribute('content', 'summary_large_image');
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', description);
    if (image) {
      document.querySelector('meta[name="twitter:image"]')?.setAttribute('content', image);
    }

    // Article Specific
    if (type === 'article') {
      document.querySelector('meta[property="article:author"]')?.setAttribute('content', author);
      if (publishedTime) {
        document.querySelector('meta[property="article:published_time"]')?.setAttribute('content', publishedTime);
      }
      if (modifiedTime) {
        document.querySelector('meta[property="article:modified_time"]')?.setAttribute('content', modifiedTime);
      }
    }

    // JSON-LD
    const jsonLD = {
      '@context': 'https://schema.org',
      '@type': type === 'article' ? 'Article' : 'WebSite',
      headline: title,
      description,
      image: image || '',
      author: {
        '@type': 'Person',
        name: author,
      },
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime,
    };

    let script = document.querySelector('#json-ld');
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLD);

    return () => {
      // Cleanup JSON-LD
      document.querySelector('#json-ld')?.remove();
    };
  }, [title, description, keywords, image, url, type, author, publishedTime, modifiedTime]);
};
