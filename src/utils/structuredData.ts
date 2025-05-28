// Schema.org Structured Data for Portfolio

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Tarcisio Bispo de Araujo",
  "jobTitle": "UX/Product Designer",
  "description": "UX/Product Designer com foco em estratégia, impacto e experiência do usuário. Especialista em design thinking, prototipagem e pesquisa de usuário.",
  "url": "https://tarcisiobispo.github.io/portfolio/",
  "image": "https://tarcisiobispo.github.io/portfolio/profile-image.jpg",
  "email": "tbisp0@hotmail.com",
  "knowsAbout": [
    "UX Design",
    "Product Design",
    "UI Design",
    "Design Thinking",
    "Prototipagem",
    "Pesquisa de Usuário",
    "Figma",
    "Adobe Creative Suite",
    "Design Systems"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/tarcisio-bispo",
    "https://github.com/tarcisiobispo",
    "https://behance.net/tarcisiobispo"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Freelancer"
  },
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Brasil",
    "addressCountry": "BR"
  }
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Portfólio de Tarcisio Bispo",
  "description": "Portfólio profissional de Tarcisio Bispo de Araujo - UX/Product Designer",
  "url": "https://tarcisiobispo.github.io/portfolio/",
  "author": {
    "@type": "Person",
    "name": "Tarcisio Bispo de Araujo"
  },
  "inLanguage": "pt-BR",
  "copyrightYear": "2024",
  "copyrightHolder": {
    "@type": "Person",
    "name": "Tarcisio Bispo de Araujo"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://tarcisiobispo.github.io/portfolio/?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

export const portfolioSchema = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": "Portfólio UX/Product Design",
  "description": "Coleção de projetos de UX/Product Design desenvolvidos por Tarcisio Bispo",
  "creator": {
    "@type": "Person",
    "name": "Tarcisio Bispo de Araujo"
  },
  "url": "https://tarcisiobispo.github.io/portfolio/",
  "dateCreated": "2024",
  "inLanguage": "pt-BR",
  "genre": "Portfolio",
  "keywords": "UX Design, Product Design, Portfolio, Design Thinking"
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://tarcisiobispo.github.io/portfolio/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Projetos",
      "item": "https://tarcisiobispo.github.io/portfolio/#projetos"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Contato",
      "item": "https://tarcisiobispo.github.io/portfolio/#contato"
    }
  ]
};

// Function to generate project schema
export const generateProjectSchema = (project: {
  name: string;
  description: string;
  url?: string;
  image?: string;
  dateCreated?: string;
  technologies?: string[];
}) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": project.name,
  "description": project.description,
  "creator": {
    "@type": "Person",
    "name": "Tarcisio Bispo de Araujo"
  },
  "url": project.url || "https://tarcisiobispo.github.io/portfolio/#projetos",
  "image": project.image,
  "dateCreated": project.dateCreated || "2024",
  "inLanguage": "pt-BR",
  "genre": "UX/Product Design Project",
  "keywords": project.technologies?.join(", ") || "UX Design, Product Design"
});

// Combined schema for the main page
export const mainPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    personSchema,
    websiteSchema,
    portfolioSchema,
    breadcrumbSchema
  ]
};
