module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './dist/index.html',
    './public/index.html'
  ],
  css: [
    './src/**/*.css'
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  safelist: [
    // Preserve dynamic classes
    /^project-/,
    /^card-/,
    /^btn-/,
    /^theme-/,
    /^dark/,
    /^light/,
    /^accessibility-/,
    /^toast-/,
    /^modal-/,
    /^dropdown-/,
    /^tooltip-/,
    /^loading-/,
    /^error-/,
    /^success-/,
    /^warning-/,
    /^info-/,
    // Framer Motion classes
    /^motion-/,
    /^animate-/,
    /^transition-/,
    // Tailwind utilities that might be used dynamically
    'sr-only',
    'not-sr-only',
    'focus-visible',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-blue-500',
    'focus:ring-offset-2',
    // Animation classes
    'fade-in',
    'fade-out',
    'slide-in',
    'slide-out',
    'scale-in',
    'scale-out',
    // State classes
    'active',
    'inactive',
    'disabled',
    'enabled',
    'expanded',
    'collapsed',
    'open',
    'closed',
    'visible',
    'hidden',
    // Typography classes
    'font-inter',
    'font-display',
    'text-gradient',
    // Layout classes
    'container',
    'wrapper',
    'section',
    'grid',
    'flex',
    // Component specific classes
    'project-showcase',
    'backlog-cycle',
    'contact-form',
    'feedback-modal',
    'language-switcher',
    'theme-toggle',
    'accessibility-menu'
  ],
  blocklist: [
    // Remove unused utility classes
    /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
    /^w-(0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    /^h-(0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    /^p-(0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    /^m-(0|px|0\.5|1|1\.5|2|2\.5|3|3\.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)$/,
    // Remove unused color variants
    /^(bg|text|border)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900|950)$/,
    // Remove unused responsive variants
    /^(sm|md|lg|xl|2xl):/,
    // Remove unused state variants
    /^(hover|focus|active|disabled|group-hover|group-focus):/
  ]
};
