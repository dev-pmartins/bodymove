import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { instagramDevProxy } from './vite.instagram-proxy.ts'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega .env* no process.env para o proxy (tokens sem VITE_)
  const env = loadEnv(mode, process.cwd(), '')
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value
  }

  return {
    plugins: [react(), instagramDevProxy()],
  }
})
