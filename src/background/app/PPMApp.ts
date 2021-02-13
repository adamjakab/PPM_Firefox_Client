import { browser } from 'webextension-polyfill-ts'
import * as _ from 'lodash'
import { PasswordCard } from '../../lib/model/password.card'
import { PasswordList } from '../../lib/model/password.list'

export class PPMApp {
  private readonly _pwdList1: PasswordList
  private readonly _pwdList2: PasswordList

  constructor () {
    this._pwdList1 = new PasswordList()
    this._pwdList2 = new PasswordList()
    this.addRandomPasscards()
  }

  public logToConsole (msg:string) {
    console.log(': ' + msg)
  }

  public getPasswordList1 () {
    return this._pwdList1
  }

  public async getPasswordList2 () {
    return new Promise<PasswordList>((resolve, reject) => {
      // resolve(this._pwdList)
      setTimeout(() => {
        resolve(this._pwdList2)
      }, 50)
    })
  }

  protected addRandomPasscards = () => {
    const pc = new PasswordCard({
      id: Math.floor(99999 * Math.random()),
      name: 'n_' + Math.floor(99999 * Math.random()),
      text: '___',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      identifier: 'i_' + Math.floor(99999 * Math.random())
    })
    this._pwdList1.addItem(pc)

    if (this._pwdList1.getLength() < 10) {
      setTimeout(this.addRandomPasscards, 1000)
    }
  }
}
