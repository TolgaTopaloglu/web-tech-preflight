import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // CSS küçültücü 10 haneli --no değerini yuvarlıyor (2416501049 -> 2416500000), renk tonu bozuluyor.
  build: { cssMinify: false },
})
