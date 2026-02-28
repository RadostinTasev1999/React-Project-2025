import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.js',
    include: [
      './src/components/login/Login.test.jsx',
      './src/components/register/Register.test.jsx',
      './src/components/catalog/Catalog.test.jsx' 
    ]
  }
})
