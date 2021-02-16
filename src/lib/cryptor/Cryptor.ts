
export class Cryptor {
  _schemes: any[]

  constructor () {
    this._schemes = []
  }

  public initialize () {
    return new Promise<void>((resolve, reject) => {
      console.log('Cryptor initialized.')
      resolve()
    })
  }
}
