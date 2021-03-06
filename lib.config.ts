import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { terser } from 'rollup-plugin-terser'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    cssTarget: 'chrome61',
    outDir: './lib',
    lib: {
      entry: 'src/index.ts',
      name: 'classify-tree',
    },
    rollupOptions: {
      external: ['vue'], //确保外部化处理那些不想打包进库的依赖
      output: {
        globals: {	//在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          vue: 'Vue'
        }
      },
      plugins: [terser()]
    },
  },
})
