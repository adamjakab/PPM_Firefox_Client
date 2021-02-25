/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const DefinePlugin = require('webpack/lib/DefinePlugin')

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
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.temp_cache')
  },
  /*
  node: {
    global: false
  },
  plugins: [
    new DefinePlugin({
      global: 'window'
    }),
    new webpack.ProvidePlugin({
      global: require.resolve('./global.js')
    })
  ], */
  devtool: 'eval-cheap-source-map'
}
