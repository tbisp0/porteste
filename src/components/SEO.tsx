import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SecureValidation } from '@/utils/secureValidation';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  structuredData?: object;
}

const SEO: React.FC<SEOProps> = ({
  title = "Tarcisio Bispo | UX/Product Designer",
  description = "Portfólio de Tarcisio Bispo de Araujo - UX/Product Designer com foco em estratégia, impacto e experiência do usuário. Especialista em design thinking, prototipagem e pesquisa de usuário.",
  keywords = "UX Designer, Product Designer, UI/UX, Design Thinking, Prototipagem, Pesquisa de Usuário, Portfolio, Tarcisio Bispo",
  image = "https://tarcisiobispo.github.io/portfolio/og-image.jpg",
  url = "https://tarcisiobispo.github.io/portfolio/",
  type = "website",
  author = "Tarcisio Bispo de Araujo",
  publishedTime,
  modifiedTime,
  section,
  structuredData
}) => {
  const siteUrl = "https://tarcisiobispo.github.io/portfolio";

  // Usar validação segura de URLs
  const fullUrl = url.startsWith('http') && SecureValidation.validateUrl(url) ? url : `${siteUrl}${url}`;
  const fullImageUrl = image.startsWith('http') && SecureValidation.validateUrl(image) ? image : `${siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="pt-BR" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Portfólio Tarcisio Bispo" />
      <meta property="og:locale" content="pt_BR" />

      {/* Article specific (for blog posts/projects) */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author} />
          {section && <meta property="article:section" content={section} />}
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        </>
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@tarcisiobispo" />
      <meta name="twitter:site" content="@tarcisiobispo" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#1e3a8a" />
      <meta name="msapplication-TileColor" content="#1e3a8a" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
