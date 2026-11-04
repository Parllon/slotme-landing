import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: '0.0.0.0', port: 5173 },
  build: {
    rollupOptions: {
      // Três páginas: a home (/), o cadastro do teste grátis (/cadastro/) e a política de privacidade (/privacidade/)
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        cadastro: fileURLToPath(new URL('./cadastro/index.html', import.meta.url)),
        privacidade: fileURLToPath(new URL('./privacidade/index.html', import.meta.url)),
      },
    },
  },
})
