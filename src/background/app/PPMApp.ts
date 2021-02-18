import Logger from '../logger/logger'
import { ConfigurationProvider } from '../configuration/configuration.provider'
import { DataProvider } from '../data/data.provider'
import { Cryptor } from '../cryptor/cryptor'
import * as _ from 'lodash'

const log = (message?: any, ...optionalParams: any[]) => {
  Logger.log('BG/PPMApp', message, ...optionalParams)
}

export class PPMApp {
  private readonly ___DO_AUTOLOGIN___ = true
  private readonly _cryptor: Cryptor
  private readonly _configurationProvider: ConfigurationProvider
  private readonly _dataProvider: DataProvider

  constructor () {
    this._cryptor = new Cryptor()
    this._configurationProvider = new ConfigurationProvider()
    this._dataProvider = new DataProvider()
  }

  public run () {
    log('Initializing...')
    window.addEventListener('PPM', this.PPMCustomEventListener.bind(this) as EventListener, false)
    this._cryptor.initialize().then(() => {
      return this._configurationProvider.initialize()
    }).then(() => {
      return this._dataProvider.initialize()
    }).then(() => {
      log('Initialized.')
      window.dispatchEvent(new CustomEvent('PPM',
        { detail: { type: 'app.state', value: 'initialized' }, bubbles: true, cancelable: true }
      ))
      if (this.___DO_AUTOLOGIN___) {
        log('Executing autologin...')
        this._configurationProvider.loadProfile(
          'DEFAULT', 'Paranoia', 'AesMd5').then(() => {
          log('Autologin done.')
        })
      }
    })
  }

  protected PPMCustomEventListener (e: CustomEvent<{type:string, value:string}>) {
    if (e && e.type === 'PPM') {
      switch (e.detail.type) {
        case 'app.state':
          log('New App state: ' + e.detail.value)
          break
        case 'config.state':
          log('New Config state: ' + e.detail.value)
          break
        default:
          log('Unhandled PPM CustomEvent: ', e)
      }
    }
  }

  get cryptor (): Cryptor {
    return this._cryptor
  }

  get configurationProvider (): ConfigurationProvider {
    return this._configurationProvider
  }

  get dataProvider (): DataProvider {
    return this._dataProvider
  }
}
