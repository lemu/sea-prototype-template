import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Optional peer deps of tide-ui that are not used in this project.
// Externalized to prevent build errors when tide-ui bundles them unconditionally.
const tideUiOptionalPeerDeps = [
  'recharts',
  'redux',
  '@tanstack/react-table',
  '@tanstack/react-virtual',
  '@dnd-kit/core',
  '@dnd-kit/sortable',
  '@dnd-kit/utilities',
  'react-hook-form',
  '@hookform/resolvers',
  'zod',
  'react-day-picker',
  'cmdk',
  'vaul',
  'react-resizable-panels',
  'country-data-list',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      external: tideUiOptionalPeerDeps,
    },
  },
})
