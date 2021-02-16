import { Configuration } from '../../lib/model/configuration'
import { browser, Storage } from 'webextension-polyfill-ts'
import _ from 'lodash'

export class ConfigurationProvider {
  private _config: Configuration

  private _currentProfileName: string
  private _currentEncryptionScheme: string
  private _currentEncryptionKey: string

  constructor () {
    // this._config = new Configuration()
    this.ensureAtLeastOneProfile().then(() => {
      console.log('Profile ensured.')
    })
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
      console.log('Writing data: ' + JSON.stringify(data))
      storage.set(data).then(() => {
        if (browser.runtime.lastError) {
          return reject(browser.runtime.lastError)
        }
        resolve()
      })
    })
  }

  protected async readFromStorage (profile:null | string) {
    return new Promise<{[s:string] : any}>((resolve, reject) => {
      const storage = this.getStorage()
      storage.get(profile).then(data => {
        console.log('Read data from storage: ' + JSON.stringify(data))
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
