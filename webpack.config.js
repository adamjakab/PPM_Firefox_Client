/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const _ = require('lodash')
const commonConfig = require('./webpack/webpack.config.common')

module.exports = _.extend(_.cloneDeep(commonConfig), {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'build-prod'),
    filename: 'js/[name].js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: true
      })
    ]
  }
})
