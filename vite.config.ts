import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/

const projectRootDir = resolve(__dirname);
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": resolve(projectRootDir),
    },
  },
  build: {
    outDir: `../studyinspb_backend/${new Date().getDay()}_${new Date().getMonth()}_${new Date().getFullYear()}`
  }
})
