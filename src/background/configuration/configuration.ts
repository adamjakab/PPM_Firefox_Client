import _ from 'lodash'

const defaultConfiguration = {
  logger: {
    do_console_logging: true,
    do_console_logging2: true
  }
}
export class Configuration {
  private readonly _configuration: any

  constructor (data?:any) {
    this._configuration = defaultConfiguration
    if (!_.isUndefined(data) && _.isObject(data)) {
      _.extend(this._configuration, data)
    }
  }

  public getAll () {
    return this._configuration
  }
}
