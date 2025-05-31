import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  base: '/portfolio/',
  plugins: [
    react({
      // SWC optimizations for production
      plugins: process.env.NODE_ENV === 'production' ? [
        ['@swc/plugin-remove-console', { exclude: ['error', 'warn'] }]
      ] : []
    }),
    // sitemap({
    //   hostname: 'https://tarcisiobispo.github.io',
    //   basePath: '/portfolio',
    //   routes: [
    //     '/',
    //     '/privacy-policy',
    //     '/#projetos',
    //     '/#backlog',
    //     '/#contato'
    //   ],
    //   changefreq: 'weekly',
    //   priority: 0.8,
    //   lastmod: '2025-01-15'
    // }),

  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5177,
    strictPort: true,
    open: true,
  },
  server: {
    port: 5177,
    strictPort: true,
    open: true,
  },
  build: {
    // Otimizações de bundle - target moderno para evitar polyfills antigos
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
    minify: 'terser',
    sourcemap: true, // Habilitar source maps para debugging

    // Configurações de chunk
    chunkSizeWarningLimit: 1000,

    // CSS otimizado para performance
    cssCodeSplit: true,
    cssMinify: false, // Desabilitar para evitar warnings do Tailwind

    rollupOptions: {
      // Evitar polyfills desnecessários - mais agressivo
      external: (id) => {
        // Excluir todos os tipos de core-js
        if (id.includes('core-js')) return true;
        if (id.includes('core-js-pure')) return true;
        if (id.includes('core-js-global')) return true;
        if (id.includes('@babel/runtime')) return true;
        return false;
      },

      output: {
        // Manual chunks mais conservador para evitar quebrar React
        manualChunks: {
          // React core - manter junto para evitar problemas de contexto
          'react-vendor': ['react', 'react-dom'],

          // Roteamento
          'router': ['react-router-dom'],

          // Animações - pode ser separado
          'animation': ['framer-motion'],

          // UI Libraries
          'ui': ['@headlessui/react', '@radix-ui/react-tooltip', '@floating-ui/react'],

          // Query
          'query': ['@tanstack/react-query'],

          // i18n
          'i18n': ['react-i18next', 'i18next', 'i18next-browser-languagedetector'],

          // Icons
          'icons': ['lucide-react'],

          // Forms
          'forms': ['react-hook-form'],

          // Analytics
          'analytics': ['@microsoft/clarity', 'logrocket']
        },

        // Nomeação de chunks
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId
            ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.tsx', '').replace('.ts', '')
            : 'chunk';
          return `js/${facadeModuleId}-[hash].js`;
        },

        // Nomeação de assets
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          const ext = info[info.length - 1];

          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name || '')) {
            return `images/[name]-[hash][extname]`;
          }

          if (/\.(css)$/i.test(assetInfo.name || '')) {
            return `css/[name]-[hash][extname]`;
          }

          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name || '')) {
            return `fonts/[name]-[hash][extname]`;
          }

          return `assets/[name]-[hash][extname]`;
        },

        // Entry file naming
        entryFileNames: 'js/[name]-[hash].js'
      },

      // Tree-shaking mais conservador
      treeshake: {
        moduleSideEffects: true, // Permitir todos os side effects
        propertyReadSideEffects: false,
        unknownGlobalSideEffects: false
      }
    },

    // Configurações do Terser mais conservadoras
    terserOptions: {
      compress: {
        drop_console: false, // Manter console.logs para debug
        drop_debugger: true,
        pure_funcs: ['console.debug'],
        passes: 1, // Uma passada apenas
        unsafe: false, // Otimizações seguras apenas
        conditionals: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        reduce_vars: true,
        side_effects: true, // Preservar side effects
        unused: true
      },
      mangle: {
        safari10: true,
        toplevel: false, // Não mangle nomes de nível superior
      },
      format: {
        comments: false
      }
    }
  },

  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
      'react-i18next',
      'i18next'
    ],
    exclude: [
      '@vite/client',
      '@vite/env',
      'core-js',
      'core-js-pure',
      'core-js-global',
      '@babel/runtime',
      '@babel/runtime-corejs3'
    ]
  },

  // Configurações específicas para resolver problemas de React em produção
  define: {
    // Garantir que o React está disponível globalmente
    global: 'globalThis',
  },

    // Configurações adicionais de servidor
    fs: {
      strict: false
    },
    // Headers de cache para desenvolvimento
    headers: {
      'Cache-Control': 'public, max-age=31536000' // 1 ano para assets com hash
    },
    // Configurações HMR para WebSocket
    hmr: {
      port: 5176,
      host: 'localhost'
    },
    // Configurações de porta
    port: 5176,
    host: 'localhost',
    strictPort: false
  }
});
