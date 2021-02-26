/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')

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
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true
          }
        }
      },
      {
        test: /lodash\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: /Function\(['"]return this['"]\)\(\)/,
          replace: 'null'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  devtool: false,
  node: false,
  plugins: [
    new webpack.ProvidePlugin({
      global: path.resolve(path.join(__dirname, '../src/lib/util/global'))
    })
  ],
  performance: {
    maxEntrypointSize: 512 * 1024,
    maxAssetSize: 512 * 1024
  }
}
