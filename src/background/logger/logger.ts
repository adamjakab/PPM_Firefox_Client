import _ from 'lodash'

class Logger {
  private readonly _doConsoleLogging:boolean

  // @todo: set up an event listener to know when ConfigProvider is ready to be queried about real config
  constructor () {
    this._doConsoleLogging = true
  }

  public log (zone?:string, message?: any, ...optionalParams: any[]) {
    if (this._doConsoleLogging) {
      if (_.isUndefined(message)) {
        message = zone
        zone = undefined
      }
      const prefix = _.isUndefined(zone) ? '' : zone + ': '
      console.log(prefix + message, ...optionalParams)
    }
  }
}

export default new Logger()
