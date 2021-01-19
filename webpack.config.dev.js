/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    background: './src/background/index.ts',
    settings: './src/settings/index.ts',
    popup: './src/popup/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'build-dev'),
    filename: '[name]/[name].js'
  },
  devtool: 'eval-cheap-source-map'
}
