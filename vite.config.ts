import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SeaPrototypeTemplate',
      formats: ['es', 'umd'],
      fileName: (format) => `sea-prototype-template.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router', 'react-router-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router': 'ReactRouter',
          'react-router-dom': 'ReactRouterDOM',
        },
      },
    },
  },
})
