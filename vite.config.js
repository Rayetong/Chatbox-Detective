import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',  // 适配 GitHub Pages 的相对路径
  server: {
    port: 5173,
    open: true  // 自动打开浏览器
  }
})