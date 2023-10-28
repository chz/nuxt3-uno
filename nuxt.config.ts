import process from 'node:process'

const isDev: boolean = process.env.NODE_ENV === 'development'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@unocss/nuxt'],
  sourcemap: !isDev,
  nitro: {
    compressPublicAssets: true,
    logLevel: 4,
    sourceMap: false,
    minify: true,
  },
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Nuxt 3 minimal app + UnoCSS + Custom SVG Icons',
    },
    rootId: 'chz',
    rootTag: 'section',
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          entryFileNames: '_nuxt/[hash].js',
          chunkFileNames: '_nuxt/[hash].js',
          assetFileNames: '_nuxt/[hash][extname]',
        },
      },
    },
  },
  routeRules: {
    '/**': isDev ? {} : { cache: { swr: true, maxAge: 120, staleMaxAge: 60, headersOnly: true } },
  },
  experimental: {
    inlineSSRStyles: false,
  },
  imports: {
    dirs: ['./stores', './locales', './utilities'],
  },
})
