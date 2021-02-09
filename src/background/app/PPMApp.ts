import { browser } from 'webextension-polyfill-ts'
import * as _ from 'lodash'
import { PasswordCard } from '../../lib/model/password.card'
import { PasswordList } from '../../lib/model/password.list'

export class PPMApp {
  private readonly _pwdList: PasswordList

  constructor () {
    this._pwdList = new PasswordList()
    this.addRandomPasscards()
  }

  public doSomething (msg:string) {
    console.log('Fico: ' + msg)
  }

  public async getPasscards () {
    return new Promise<PasswordList>((resolve, reject) => {
      setTimeout(() => {
        resolve(this._pwdList)
      }, 500)
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
    this._pwdList.addItem(pc)

    if (this._pwdList.getLength() < 10) {
      setTimeout(this.addRandomPasscards, 1000)
    }
  }
}
