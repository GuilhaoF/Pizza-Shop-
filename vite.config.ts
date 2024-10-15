import path from 'node:path'

import react from '@vitejs/plugin-react'
import type { InlineConfig, UserConfig } from 'vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/setup-test/setup.ts'],
  },
} as UserConfig & {
  test : InlineConfig
})