import { IConfig } from 'umi-types';
const CompressionWebpackPlugin = require('compression-webpack-plugin');

// ref: https://umijs.org/config/
const config: IConfig = {
  sass: {
    implementation: require('node-sass'),
  },
  history: 'hash',
  treeShaking: true,
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 生产模式开启
      const gzipList = ['js', 'css'];
      config.plugin('compression-webpack-plugin').use(
        new CompressionWebpackPlugin({
          algorithm: 'gzip', // 指定生成gzip格式
          test: new RegExp('\\.(' + gzipList.join('|') + ')$'), // 匹配哪些格式文件需要压缩
          threshold: 10240, //对超过10k的数据进行压缩
          minRatio: 0.6, // 压缩比例，值为0 ~ 1
        }),
      );
    }
  },
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
