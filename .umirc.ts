import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  sass: {
    implementation: require('node-sass'),
  },
  history: 'hash',
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: { webpackChunkName: true },
        title: 'pluto-admin-front',
        dll: true,
        routes: {
          exclude: [
            /core\//,
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  proxy: {
    '/admin': {
      target: 'http://localhost:7001',
      changeOrigin: true,
    },
  },
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV,
  },
};

export default config;
