import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(),
    viteStaticCopy({
      targets: [
        {
          src: 'index.html', // fallback page
          dest: '.', // copy to root of dist
          rename: '404.html' // GitHub Pages will serve this on 404
        }
      ]
    })
  ],
  base: "/loan-calculator",
  css: {
    postcss: './postcss.config.cjs'
  }
})