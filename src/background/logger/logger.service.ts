import { getPPMApp } from '../../lib/util/utils'
import { LoggerServiceInterface } from '../../lib/interface/service.interface'

export class LoggerService implements LoggerServiceInterface {
  /** @todo: Set me(_doConsoleLogging) to false! */
  private _doConsoleLogging = true

  constructor () {
    window.addEventListener('PPM', this.PPMCustomEventListener.bind(this) as EventListener, false)
  }

  /**
   * Load the relative configuration as soon it is available by the configurationProvider
   */
  protected PPMCustomEventListener (e: CustomEvent<{ type: string, value: string, zone: string, message: string, optionalParams: [] }>) {
    if (e && e.type === 'PPM') {
      if (e.detail.type === 'config.state' && e.detail.value === 'loaded') {
        getPPMApp().then((PPMApp) => {
          return PPMApp.configurationProvider.getConfiguration()
        }).then(configuration => {
          this._doConsoleLogging = configuration.get('logger.do_console_logging')
          this.log('LoggerService', 'Console Logging Config changed to: ' + this._doConsoleLogging)
        })
      }
    }
  }

  public log (zone: string, message: any, ...optionalParams: any[]) {
    if (this._doConsoleLogging) {
      const prefix = zone + ': '
      if (optionalParams.length && optionalParams[0].length) {
        console.log(prefix + message, optionalParams)
      } else {
        console.log(prefix + message)
      }
    }
  }
}
