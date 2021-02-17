import { Configuration } from '../../lib/model/configuration'
import { browser, Storage } from 'webextension-polyfill-ts'
import _ from 'lodash'

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
        console.log('ConfigurationProvider initialized.')
        resolve()
      })
    })
  }

  public async loadProfile (profileName:string, encryptionKey:string, encryptionSchemeName:string):Promise<void> {
    const profiles = await this.getAvailableProfileNames()
    if (!_.includes(profiles, profileName)) {
      throw new Error('Requested profile(' + profileName + ') is not available. Profiles: ' + JSON.stringify(profiles))
    }
    const encryptedProfileData = await this.readFromStorage(profileName)
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
        this._currentProfileName = 'DEFAULT'
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
      // console.log('Writing data: ' + JSON.stringify(data))
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
        // console.log('Read data from storage: ' + JSON.stringify(data))
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

  // @todo: divide this into two separate methods a) return _config  b) return config values
  public async getConfiguration (path?:string) {
    return new Promise<any>((resolve, reject) => {
      if (!this.isAvailable()) {
        return reject(new Error('Configuration is not available'))
      }
      if (_.isUndefined(path) || _.isEmpty(path)) {
        return resolve(this._config)
      }
      if (!_.has(this._config, path)) {
        return reject(new Error('Unknown path in Configuration: ' + path))
      }
      resolve(_.get(this._config, path))
    })
  }
}
