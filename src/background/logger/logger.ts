import _ from 'lodash'
import { getPPMApp } from '../../lib/util/utils'

// @fixme: there is an instance of this call for each entry point in tha application! Unify under PPMApp
class Logger {
  private _doConsoleLogging:boolean

  constructor () {
    this._doConsoleLogging = true
    window.addEventListener('PPM', this.PPMCustomEventListener.bind(this) as EventListener, false)
    console.log('new logger')
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
          return PPMApp.configurationProvider.getConfiguration()
        }).then(configuration => {
          this._doConsoleLogging = configuration.get('logger.do_console_logging')
          this.log('LOGGER', 'New Console Logging Config: ' + this._doConsoleLogging)
        })
      }
    }
  }
}

// There will be only one logger instance.
export default new Logger()
