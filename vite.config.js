import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative asset paths only for the hash-router build (static hosting in a sub-folder)
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_HASH_ROUTER === '1' ? './' : '/',
})
