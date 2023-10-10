import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

const config: UserConfig = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': new URL('./src', import.meta.url).pathname,
    },
  },
})

export default config