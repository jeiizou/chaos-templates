import { defineConfig } from 'umi';

// https://umijs.org/zh-CN/config
export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // delete here to use Conventional routing
  // routes: [{ path: '/', component: '@/pages/index' }],
  fastRefresh: {}, // enable fast refresh
});
