import { log } from '../../lib/util/unified.logger'
import { CryptorInterface } from '../../lib/interface/service.interface'

export class Cryptor implements CryptorInterface {
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
