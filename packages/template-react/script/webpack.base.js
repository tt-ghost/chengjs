const path = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const {
  useJsxLoader,
  useImageLoader,
  useSvgLoader,
} = require('./helper')

module.exports = (env = {}) => {
  return {
    entry: './src/main.jsx',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/',
    },
    plugins: [
      new webpack.DefinePlugin(env),
      new webpack.ProvidePlugin({
        // React: 'react',
        // ReactDOM: 'react-dom'
      }),
      new HtmlPlugin({
        template: './public/index.html',
        filename: 'index.html',
        inject: 'body'
      })
    ],
    module: {
      rules: [
        useJsxLoader(),
        useImageLoader(),
        useSvgLoader()
      ]
    },
    resolve: {
      extensions: ['.jsx', '.tsx', '.ts', '.js', '.vue', '.less', '.sass', '.scss']
    },
    // externals: {
    //   react: 'React',
    //   'react-dom': 'ReactDOM',
    // }
  }
}