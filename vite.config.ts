import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
  ],
  //设置代理
  server: {
    https: false,
    host: '0.0.0.0',
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },

    proxy: {
      '/api': {
        target: 'http://jisuye.com/ahxx/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
