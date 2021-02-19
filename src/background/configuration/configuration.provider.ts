import Logger from '../logger/logger'
import { Configuration, ConfigurationData } from './configuration'
import { browser, Storage } from 'webextension-polyfill-ts'
import _ from 'lodash'

const log = (message?: any, ...optionalParams: any[]) => {
  Logger.log('BG/ConfigProvider', message, ...optionalParams)
}

export class ConfigurationProvider {
  private _config: Configuration

  private _currentProfileName: string
  private _currentEncryptionScheme: string
  private _currentEncryptionKey: string

  // eslint-disable-next-line no-useless-constructor
  constructor () {
    // this._config = new Configuration()
  }

  public initialize () {
    return new Promise<void>((resolve, reject) => {
      this.ensureAtLeastOneProfile().then(() => {
        log('Initialized.')
        resolve()
      })
    })
  }

  public async loadProfile (profileName:string, encryptionKey:string, encryptionSchemeName:string):Promise<void> {
    const profiles = await this.getAvailableProfileNames()
    if (!_.includes(profiles, profileName)) {
      throw new Error('Requested profile(' + profileName + ') is not available. Profiles: ' + JSON.stringify(profiles))
    }
    const storageData = await this.readFromStorage(profileName)
    const encryptedProfileData = _.get(storageData, profileName, '')
    // decrypt here...
    const decryptedProfileData = encryptedProfileData
    this._config = new Configuration(decryptedProfileData)
    this._currentProfileName = profileName
    this._currentEncryptionScheme = encryptionSchemeName
    this._currentEncryptionKey = encryptionKey
    window.dispatchEvent(new CustomEvent('PPM',
      { detail: { type: 'config.state', value: 'loaded' }, bubbles: true, cancelable: true }
    ))
  }

  protected async ensureAtLeastOneProfile () {
    return new Promise<void>((resolve, reject) => {
      this.getAvailableProfileNames().then(profiles => {
        if (!_.isEmpty(profiles)) {
          return resolve()
        }
        this._currentProfileName = 'DEFAULT2'
        this._currentEncryptionScheme = 'AesMd5'
        this._currentEncryptionKey = 'Paranoia'
        this._config = new Configuration()
        this.writeToStorage(this._currentProfileName, this._config.getAll()).then(() => {
          resolve()
        })
      })
    })
  }

  protected async getAvailableProfileNames () {
    return new Promise<string[]>((resolve, reject) => {
      this.readFromStorage(null).then(data => {
        resolve(_.keys(data))
      })
    })
  }

  protected async writeToStorage (profile:string, value:any) {
    return new Promise<void>((resolve, reject) => {
      const storage = this.getStorage()
      const data = _.set({}, profile, value)
      // log('Writing data: ' + JSON.stringify(data))
      storage.set(data).then(() => {
        if (browser.runtime.lastError) {
          return reject(browser.runtime.lastError)
        }
        resolve()
      })
    })
  }

  protected async readFromStorage (profile:null | string) {
    return new Promise<any>((resolve, reject) => {
      const storage = this.getStorage()
      storage.get(profile).then(data => {
        // log('Read data from storage(profile=' + profile + '): ' + JSON.stringify(data))
        if (browser.runtime.lastError) {
          return reject(browser.runtime.lastError)
        }
        resolve(data)
      })
    })
  }

  protected getStorage () {
    return browser.storage.sync
  }

  public isAvailable () {
    return !_.isUndefined(this._config)
  }

  public async getConfiguration () {
    return new Promise<Configuration>((resolve, reject) => {
      if (!this.isAvailable()) {
        return reject(new Error('Configuration is not available'))
      }
      return resolve(this._config)
    })
  }
}
