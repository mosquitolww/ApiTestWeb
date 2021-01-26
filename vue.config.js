/* eslint-disable */
const path = require('path');
const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: "./",
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: {
    externals: {
      // 'vue': 'Vue',
      // 'element-ui': 'ELEMENT',
      // echarts: 'echarts',
      // 将需要忽略打包的都写在这个里面，但前提是index.html文件里面必须script引入
    },
    resolve: {            
      alias: {                
          '@': path.resolve(__dirname, './src'),                
          '@i': path.resolve(__dirname, './src/assets'),            
      }        
    },        
    plugins: [            
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),            
      // 下面是下载的插件的配置            
      new CompressionWebpackPlugin({                
          algorithm: 'gzip',                
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),                
          threshold: 10240,                
          minRatio: 0.8           
      }),            
      new webpack.optimize.LimitChunkCountPlugin({                
          maxChunks: 5,                
          minChunkSize: 100            
      })        
    ] 
  },

  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      assetsDir: "src/assets",
      // 在 dist/index.html 的输出
      // filename: 'src/index.html',
      // 当使用 title 选项时，

    },

  },
  devServer: {
    // host: '0.0.0.0',
    host: '127.0.0.1',
    // host: '122.51.184.120',
    port: 8010,
    proxy: {
      '/api/': {
        target: 'http://0.0.0.0:8080',
        // target: 'http://172.20.11.210/',
        // target: 'http://172.17.0.16:8080',
        // target: 'http://122.51.184.120',
        changeOrigin: true,
      }
    },
    disableHostCheck: true
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: `@import '~@/assets/css/color.scss';`
      }
    }
  },
}