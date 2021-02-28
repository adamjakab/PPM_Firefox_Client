/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const _ = require('lodash')
const commonConfig = require('./webpack/webpack.config.common')

module.exports = _.extend(_.cloneDeep(commonConfig), {
  output: {
    path: path.resolve(__dirname, 'build-dev'),
    filename: 'js/[name].js'
  },
  devtool: 'cheap-module-source-map',
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.cache')
  }
})
