import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需加载组件，不用显示手动导入
// import Components from 'unplugin-vue-components/vite'
// import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

export default ({ mode }) => {
  console.log(`当前环境：${mode}`)
  return defineConfig({
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve(__dirname, 'src'),
        },
      ],
    },
    plugins: [vue()],
    server: {
      host: '0.0.0.0',
      port: 3000,
      proxy: {
        // 线上开发
        '/auth': 'http://9wv9811285hg.vicp.fun/serviceTwo',
        '/account': 'http://9wv9811285hg.vicp.fun/serviceTwo',
        '/dict': 'http://9wv9811285hg.vicp.fun/serviceTwo',
        '/history': 'http://9wv9811285hg.vicp.fun/serviceTwo',
      },
    },
  })
}
