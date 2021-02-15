import * as _ from 'lodash'
import { ConfigurationProvider } from '../configuration/configuration.provider'
import { DataProvider } from '../data/data.provider'

export class PPMApp {
  private readonly _configurationProvider: ConfigurationProvider
  private readonly _dataProvider: DataProvider

  constructor () {
    this._configurationProvider = new ConfigurationProvider()
    this._dataProvider = new DataProvider()
  }

  public run () {
    this.logToConsole('Running PPMApp...')
    // window.dispatchEvent(new Event('locationchange'))
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
