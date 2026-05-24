import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { copyFileSync, mkdirSync } from 'fs'
import { resolve } from 'path'

// Plugin: after build, copy index.html into each route folder so GitHub Pages
// serves /snapmonk and /privacy as real files (200 OK) rather than 404.
function copyIndexForRoutes(routes: string[]) {
  return {
    name: 'copy-index-for-routes',
    closeBundle() {
      for (const route of routes) {
        const dir = resolve(__dirname, 'dist', route)
        mkdirSync(dir, { recursive: true })
        copyFileSync(resolve(__dirname, 'dist/index.html'), resolve(dir, 'index.html'))
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    copyIndexForRoutes(['snapmonk', 'privacy']),
  ],
  base: '/',
})
