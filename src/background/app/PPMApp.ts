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
    this.logToConsole('Running PPMApp...')
    // window.dispatchEvent(new Event('locationchange'))
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
