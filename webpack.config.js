/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  mode: 'production',
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
        exclude: /node_modules/,
        use: 'ts-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    path: path.resolve(__dirname, 'build-prod'),
    filename: '[name]/[name].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true
      })
    ]
  },
  devtool: false
}
