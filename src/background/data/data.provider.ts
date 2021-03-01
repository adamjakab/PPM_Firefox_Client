import { log } from '../../lib/util/unified.logger'
import { PasswordList } from '../../lib/model/password.list'
import { PasswordCard } from '../../lib/model/password.card'
import { getRandomString } from '../../lib/util/utils'
import * as _ from 'lodash'
import { DataProviderInterface } from '../../lib/interface/service.interface'

export class DataProvider implements DataProviderInterface {
  private readonly _pwdList: PasswordList

  constructor () {
    this._pwdList = new PasswordList()
  }

  public initialize () {
    return new Promise<void>((resolve, reject) => {
      setInterval(() => {
        this.modifyPasswordList()
      }, 5000)
      log('DataProvider initialized.')
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

  protected modifyPasswordList () {
    const pwListLen = this._pwdList.getLength()
    const operations = ['add', 'remove']
    let operation = _.nth(operations, Math.floor(Math.random() * operations.length))
    if (pwListLen < 3) {
      operation = 'add'
    }
    if (pwListLen === 10) {
      operation = 'remove'
    }
    if (operation === 'add') {
      log('Add item to pwList(' + pwListLen + ')')
      this._pwdList.addItem(this.getRandomPasscard())
    }
    if (operation === 'remove') {
      const pos = Math.floor(Math.random() * pwListLen)
      log('Remove item from pwList(' + pwListLen + ') at: ' + pos)
      this._pwdList.removeItemAt(pos)
    }
  }

  protected getRandomPasscard = () => {
    return new PasswordCard({
      id: getRandomString(12),
      name: getRandomString(32),
      text: '',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      identifier: getRandomString(8)
    })
  }
}
