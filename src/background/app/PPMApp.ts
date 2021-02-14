import * as _ from 'lodash'
import { PasswordCard } from '../../lib/model/password.card'
import { PasswordList } from '../../lib/model/password.list'

export class PPMApp {
  private readonly _pwdList: PasswordList

  constructor () {
    this._pwdList = new PasswordList()
  }

  public run () {
    this.logToConsole('Running PPMApp...')
  }

  public logToConsole (msg:string) {
    console.log(': ' + msg)
  }

  public async getPasswordList () {
    return new Promise<PasswordList>((resolve, reject) => {
      _.each(_.range(1, 5), i => {
        this.addRandomPasscards(this._pwdList)
      })
      setTimeout(() => {
        resolve(this._pwdList)
      }, 50)
    })
  }

  protected addRandomPasscards = (list:PasswordList) => {
    const pc = new PasswordCard({
      id: Math.floor(99999 * Math.random()),
      name: 'n_' + Math.floor(99999 * Math.random()),
      text: '___',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      identifier: 'i_' + Math.floor(99999 * Math.random())
    })
    list.addItem(pc)
  }
}
