import { fileURLToPath, URL } from 'node:url'
import pkg from './package.json';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteBanner from 'vite-plugin-banner';
import { createHtmlPlugin } from 'vite-plugin-html';

const banner = `
/**
 * @name ${pkg.name}
 * @description ${pkg.description}
 *
 * @version ${pkg.version}
 * @author ${pkg.author}
 * @license ${pkg.license}
 */
`.trim();

const outputFolder = 'dist'; // Specify the output directory (relative to project root).
const assetsFolder = 'src/assets'; // Specify the assets folder (relative to project root).
process.env.BASE_URL = process.env.BRANCH === 'gh-pages' ? '/Weather-App/' : '/'; // The name of the Github repository

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.BASE_URL,
  assetsInclude: assetsFolder,
  server: {
    open: true,
    host: true,
  },
  build: {
    outDir: outputFolder,
    assetsDir: assetsFolder,
    assetsInlineLimit: 0,
    emptyOutDir: true,
    minify: 'terser',
    terserOptions: {
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        dir: outputFolder,
        chunkFileNames: '[name].js',
        entryFileNames: '[name].js',
        assetFileNames: ({ name = '' }) => {
          if (/\.css$/.test(name)) return 'assets/styles/[name][extname]';
          return '[name][extname]';
        }
      }
    }
  },
  plugins: [
    vue(),
    viteBanner({ outDir: outputFolder, content: banner }),
    createHtmlPlugin({ minify: true, inject: { data: { BASE_URL: process.env.BASE_URL } } }),
  ],
  resolve: {
    alias: {
      '@views': fileURLToPath(new URL('./src/views/', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components/', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/services/', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/helpers/', import.meta.url)),
      '@mock': fileURLToPath(new URL('./src/mock/', import.meta.url)),
      '@types': fileURLToPath(new URL('./srx/types/', import.meta.url)),
    }
  }
})
