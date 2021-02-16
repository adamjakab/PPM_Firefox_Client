import * as _ from 'lodash'
import { ConfigurationProvider } from '../configuration/configuration.provider'
import { DataProvider } from '../data/data.provider'
import { Cryptor } from '../../lib/cryptor/Cryptor'

export class PPMApp {
  private readonly _cryptor: Cryptor
  private readonly _configurationProvider: ConfigurationProvider
  private readonly _dataProvider: DataProvider

  constructor () {
    this._cryptor = new Cryptor()
    this._configurationProvider = new ConfigurationProvider()
    this._dataProvider = new DataProvider()
  }

  public run () {
    this.logToConsole('Initializing PPMApp...')
    window.addEventListener('PPM', this.PPMCustomEventListener as EventListener, false)
    this._cryptor.initialize().then(() => {
      return this._configurationProvider.initialize()
    }).then(() => {
      return this._dataProvider.initialize()
    }).then(() => {
      this.logToConsole('PPMApp initialized.')
      window.dispatchEvent(new CustomEvent('PPM',
        { detail: { type: 'app.state', value: 'initialized' }, bubbles: true, cancelable: true }
      ))
    })
  }

  protected PPMCustomEventListener (e: CustomEvent<{type:string, value:string}>) {
    if (e && e.type === 'PPM') {
      switch (e.detail.type) {
        case 'app.state':
          console.log('New App state: ', e.detail.value)
          break
        default:
          console.log('Unhandled PPM CustomEvent: ', e)
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

  public logToConsole (msg:string) {
    console.log(': ' + msg)
  }
}
