import { log } from '../../lib/util/unified.logger'

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
