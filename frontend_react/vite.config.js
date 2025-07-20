import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/postcss'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          // Tailwind v4 will automatically scan these paths
          content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}']
        })
      ]
    }
  }
})
