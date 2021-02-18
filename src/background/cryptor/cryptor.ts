import Logger from '../logger/logger'

const log = (message?: any, ...optionalParams: any[]) => {
  Logger.log('BG/Cryptor', message, ...optionalParams)
}

export class Cryptor {
  _schemes: any[]

  constructor () {
    this._schemes = []
  }

  public initialize () {
    return new Promise<void>((resolve, reject) => {
      log('Initialized.')
      resolve()
    })
  }
}
