import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss(), {
    name: 'desktop-offline-fonts',
    transformIndexHtml: (html) => mode === 'desktop'
      ? html.replace(/\s*<link[^>]+https:\/\/fonts\.(?:googleapis|gstatic)\.com[^>]*>/g, '')
      : html,
  }],
}))
