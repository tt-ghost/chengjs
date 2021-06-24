const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const base = require('./webpack.base')
const { useSassLoader } = require('./helper')

module.exports = env => {
  const mode = 'production'

  return merge(base(env), {
    mode,
    output: {
      filename: 'static/js/[name].[hash:8].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
      library: {
        name: 'ChengjsTemplateReact',
        type: 'umd',
        export: 'default'
      },
      clean: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[id].[contenthash:8].css'
      })
    ],
    module: {
      rules: [
        useSassLoader(mode)
      ]
    },
    optimization: {
      minimizer: [
        (compiler) => {
          new TerserPlugin({
            /* 你的配置 */
            extractComments: 'all'
          }).apply(compiler);
        },
        (compiler) => {
          new CssMinimizerPlugin().apply(compiler)
        }
      ],
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        // name: true,
        cacheGroups: {
          // 'react-commom': {
          //   test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          //   name: 'react-commom',
          //   chunks: 'all'
          // },
          // 'next-style': {
          //   test: /[\\/]node_modules[\\/]@alifd[\\/]next[\\/]/,
          //   name: 'next-style',
          //   chunks: 'all'
          // },
          // styles: {
          //   name: '[name].[contenthash].css',
          //   test: /\.(le|c|sa)ss$/,
          //   chunks: 'all',
          //   enforce: true
          // }
        }
      },
      emitOnErrors: true
    }
  })
}