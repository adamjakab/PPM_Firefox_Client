/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  target: 'web',
  entry: {
    background: {
      import: './src/background/index.ts',
      dependOn: ['shared']
    },
    settings: {
      import: './src/settings/index.ts',
      dependOn: ['shared', 'ui']
    },
    popup: {
      import: './src/popup/index.ts',
      dependOn: ['shared', 'ui']
    },
    shared: {
      import: ['lodash', 'webextension-polyfill-ts'],
      runtime: 'runtime'
    },
    ui: {
      import: ['react', 'react-dom',
        'single-spa', 'single-spa-react',
        './node_modules/single-spa-react/lib/cjs/single-spa-react.cjs'],
      runtime: 'runtime'
    }
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
        /* Workaround for web-ext warning: 'DANGEROUS_EVAL: The Function constructor is eval.'  */
        test: /lodash\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: /Function\(['"]return this['"]\)\(\)/,
          replace: 'null'
        }
      },
      {
        /* Workaround for web-ext warning: 'UNSAFE_VAR_ASSIGNMENT: Unsafe assignment to innerHTML'  */
        test: /react-dom\.development\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: /\.innerHTML\s?=/g,
          replace: '.innerText='
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
    }),
    new HtmlWebpackPlugin({
      title: 'Background Application Container',
      filename: 'background.html',
      template: 'src/html/background.ejs',
      inject: 'head',
      chunks: ['background', 'shared']
    }),
    new HtmlWebpackPlugin({
      title: 'Paranoia Password Manager Configuration',
      filename: 'settings.html',
      template: 'src/html/settings.ejs',
      inject: 'head',
      chunks: ['settings', 'shared', 'ui']
    }),
    new HtmlWebpackPlugin({
      title: 'Paranoia Password Manager Popup',
      filename: 'popup.html',
      template: 'src/html/popup.ejs',
      inject: 'head',
      chunks: ['popup', 'shared', 'ui']
    })
  ],
  performance: {
    maxEntrypointSize: 512 * 1024,
    maxAssetSize: 512 * 1024
  }
}
