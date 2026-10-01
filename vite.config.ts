import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    proxy: { '/api': 'http://127.0.0.1:4173' }
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['icon.svg'],
      manifest: {
        name: 'What’s for Gin-ner? — Weekly Meal Planner',
        short_name: 'Gin-ner?',
        description: 'Let Ginny fetch your weekly dinners and offline shopping list.',
        theme_color: '#173f35',
        background_color: '#f5f1e8',
        display: 'standalone',
        start_url: '/',
        icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any maskable' }]
      },
      workbox: {
        navigateFallback: '/index.html',
        globPatterns: ['**/*.{js,css,html,svg,woff2}']
      }
    })
  ]
})
