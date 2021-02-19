/* eslint-disable camelcase */
import _ from 'lodash'
import Logger from '../logger/logger'

const log = (message?: any, ...optionalParams: any[]) => {
  Logger.log('BG/Config', message, ...optionalParams)
}

export interface ConfigurationData {
  logger: {
    do_console_logging: boolean
  }
}

const defaultConfiguration:ConfigurationData = {
  logger: {
    do_console_logging: true
  }
}

export class Configuration {
  private readonly _configuration: ConfigurationData

  constructor (data?:ConfigurationData) {
    this._configuration = defaultConfiguration
    if (!_.isUndefined(data) && _.isObject(data)) {
      _.extend(this._configuration, data)
    }
  }

  public get (path:string) {
    if (!_.has(this._configuration, path)) {
      throw new Error('Unknown path(' + path + ') in configuration: ' + JSON.stringify(this._configuration))
    }
    return _.get(this._configuration, path)
  }

  public getAll () {
    return this._configuration
  }
}
