const path = require('path')

module.exports = {
  entry: '../src/index.ts',
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.t|js$/,
        use: [
          {
            loader: 'babel-loader'
          }, {
            loader: 'ts-loader'
          },
        ]
      }
    ]
  }
}