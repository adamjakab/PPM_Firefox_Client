import _ from 'lodash'
import { getPPMApp } from '../../lib/util/utils'

// @fixme: there is an instance of this call for each entry point in tha application! Unify under PPMApp
export class LoggerService {
  private _doConsoleLogging:boolean

  constructor () {
    this._doConsoleLogging = true
    window.addEventListener('PPM', this.PPMCustomEventListener.bind(this) as EventListener, false)
    console.log('new LoggerService created.')
  }

  /**
   * Load the relative configuration as soon it is available by the configurationProvider
   */
  protected PPMCustomEventListener (e: CustomEvent<{type:string, value:string, zone:string, message:string, optionalParams:[]}>) {
    if (e && e.type === 'PPM') {
      if (e.detail.type === 'config.state' && e.detail.value === 'loaded') {
        getPPMApp().then((PPMApp) => {
          return PPMApp.configurationProvider.getConfiguration()
        }).then(configuration => {
          this._doConsoleLogging = configuration.get('logger.do_console_logging')
          this.log('LoggerService', 'New Console Logging Config: ' + this._doConsoleLogging)
        })
      } else if (e.detail.type === 'log.message') {
        this.log(e.detail.zone, e.detail.message, e.detail.optionalParams)
      }
    }
  }

  private log (zone?:string, message?: any, ...optionalParams: any[]) {
    if (this._doConsoleLogging) {
      if (_.isUndefined(message)) {
        message = zone
        zone = undefined
      }
      const prefix = _.isUndefined(zone) ? '' : zone + ': '
      if (optionalParams.length && optionalParams[0].length) {
        console.log(prefix + message, optionalParams)
      } else {
        console.log(prefix + message)
      }
    }
  }
}
