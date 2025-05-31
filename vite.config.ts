import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';
  const isAnalyze = process.env.ANALYZE === 'true';
  
  return {
    // Base path configuration
    base: isDev ? '/' : '/portfolio/',
    
    // Define global variables and environment settings
    define: {
      'import.meta.env.MODE': JSON.stringify(mode),
      'import.meta.env.DEV': JSON.stringify(isDev),
      'import.meta.env.PROD': JSON.stringify(isProd),
      'process.env': {},
      global: 'globalThis',
    },
    
    // Plugins
    plugins: [
      // React with SWC for better performance
      react({
        plugins: isProd 
          ? [['@swc/plugin-remove-console', { exclude: ['error', 'warn'] }]] 
          : []
      }),
      
      // Bundle analyzer (available at /bundle-stats.html)
      isAnalyze && visualizer({
        open: true,
        filename: 'dist/bundle-stats.html',
        gzipSize: true,
        brotliSize: true,
      })
    ].filter(Boolean as any),
  
    // Module resolution configuration
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    
    // Development server configuration
    server: {
      port: 5178,
      strictPort: true,
      open: true,
      fs: {
        strict: false
      },
      headers: {
        'Cache-Control': 'no-cache'
      },
      hmr: {
        overlay: false
      }
    },
    
    // Build configuration
    build: {
      // Target modern browsers that support ES2020
      target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
      
      // Minification and sourcemaps
      minify: 'terser',
      sourcemap: !isProd,
      
      // Chunk configuration
      chunkSizeWarningLimit: 1000,
      
      // CSS optimizations
      cssCodeSplit: true,
      cssMinify: isProd,
      
      // Rollup configuration
      rollupOptions: {
        // Avoid including unnecessary polyfills
        external: [
          /^node:.*/, // Native Node modules
          /core-js/, // core-js polyfills
          /@babel\/runtime/ // Babel runtime
        ],
        
        output: {
          // Code-splitting strategy
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              // Group by package
              const packageName = id.split('node_modules/')[1].split('/')[0];
              
              // Group large packages separately
              if (['react', 'react-dom'].includes(packageName)) {
                return 'vendor-react';
              }
              if (['framer-motion'].includes(packageName)) {
                return 'vendor-animations';
              }
              if (packageName.startsWith('@radix-ui') || packageName.startsWith('@headlessui')) {
                return 'vendor-ui';
              }
              
              return 'vendor-other';
            }
            return null;
          },
          
          // File naming
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          
          // Asset naming
          assetFileNames: (assetInfo) => {
            const ext = assetInfo.name?.split('.').pop()?.toLowerCase() || '';
            
            if (['png', 'jpg', 'jpeg', 'svg', 'gif', 'webp'].includes(ext)) {
              return 'assets/images/[name]-[hash][extname]';
            }
            
            if (['woff', 'woff2', 'eot', 'ttf', 'otf'].includes(ext)) {
              return 'assets/fonts/[name]-[hash][extname]';
            }
            
            if (ext === 'css') {
              return 'assets/css/[name]-[hash][extname]';
            }
            
            return 'assets/[name]-[hash][extname]';
          },
        },
        
        // Tree-shaking
        treeshake: {
          moduleSideEffects: true,
          propertyReadSideEffects: false,
          unknownGlobalSideEffects: false
        }
      },
      
      // Terser configuration
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: true,
          pure_funcs: ['console.debug'],
          passes: 2,
          ecma: 2020
        },
        format: {
          comments: false,
          ecma: 2020
        },
        mangle: {
          safari10: true
        }
      }
    },
    
    // Dependency optimizations
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        'framer-motion',
        'lucide-react',
        'react-i18next',
        'i18next',
        '@tanstack/react-query'
      ],
      exclude: [
        '@vite/client',
        '@vite/env',
        'core-js',
        '@babel/runtime'
      ]
    },
    
    // Preview configuration
    preview: {
      port: 4173,
      open: true
    },
    
    // Cache configuration
    cacheDir: 'node_modules/.vite',
    
    // Logging configuration
    logLevel: 'info',
    clearScreen: false
  };
});
