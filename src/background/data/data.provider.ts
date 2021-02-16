import { PasswordList } from '../../lib/model/password.list'
import { PasswordCard } from '../../lib/model/password.card'
import { getRandomString } from '../../lib/util/utils'
import * as _ from 'lodash'

export class DataProvider {
  private readonly _pwdList: PasswordList

  constructor () {
    this._pwdList = new PasswordList()
    /*
    setInterval(() => {
      this.generateRandomPasscards(1)
    }, 5000)
     */
  }

  public initialize () {
    return new Promise<void>((resolve, reject) => {
      this.generateRandomPasscards(8)
      console.log('DataProvider initialized.')
      resolve()
    })
  }

  public async getPasswordList () {
    return new Promise<PasswordList>((resolve, reject) => {
      setTimeout(() => {
        resolve(this._pwdList)
      }, 50)
    })
  }

  protected generateRandomPasscards (length:number) {
    _.each(_.range(0, length), i => {
      this._pwdList.addItem(this.getRandomPasscards())
    })
  }

  protected getRandomPasscards = () => {
    const index = this._pwdList.getLength()
    return new PasswordCard({
      id: index + '___' + getRandomString(8),
      name: getRandomString(32),
      text: '',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      identifier: getRandomString(8)
    })
  }
}
