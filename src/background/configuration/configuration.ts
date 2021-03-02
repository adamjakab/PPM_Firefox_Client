/* eslint-disable camelcase */
import _ from 'lodash'

export interface ConfigurationData {
  logger: {
    do_console_logging: boolean,
    test_element: string
  }
}

const defaultConfiguration: ConfigurationData = {
  logger: {
    do_console_logging: true,
    test_element: ''
  }
}

export class Configuration {
  private readonly _configuration: ConfigurationData

  constructor (data?: ConfigurationData) {
    this._configuration = defaultConfiguration
    if (!_.isUndefined(data) && _.isObject(data)) {
      _.extend(this._configuration, data)
    }
  }

  public get (path: string) {
    if (!_.has(this._configuration, path)) {
      throw new Error('Unknown get path(' + path + ') in configuration: ' + JSON.stringify(this._configuration))
    }
    return _.get(this._configuration, path)
  }

  public set (path: string, value: any) {
    if (!_.has(this._configuration, path)) {
      throw new Error('Unknown set path(' + path + ') in configuration: ' + JSON.stringify(this._configuration))
    }
    return _.set(this._configuration, path, value)
  }

  public getAll () {
    return this._configuration
  }
}
