import _ from 'lodash'
import { getPPMApp } from '../../lib/util/utils'

class Logger {
  private _doConsoleLogging:boolean

  constructor () {
    this._doConsoleLogging = true
    window.addEventListener('PPM', this.PPMCustomEventListener.bind(this) as EventListener, false)
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

  /**
   * Load the relative configuration as soon it is available by the configurationProvider
   */
  protected PPMCustomEventListener (e: CustomEvent<{type:string, value:string}>) {
    if (e && e.type === 'PPM') {
      if (e.detail.type === 'config.state' && e.detail.value === 'loaded') {
        getPPMApp().then((PPMApp) => {
          return PPMApp.configurationProvider.getConfiguration('logger.do_console_logging')
        }).then(doConsoleLogging => {
          this._doConsoleLogging = doConsoleLogging
          // this.log('LOGGER', 'New Console Logging Config: ' + doConsoleLogging)
        })
      }
    }
  }
}

// There will be only one logger instance.
export default new Logger()
