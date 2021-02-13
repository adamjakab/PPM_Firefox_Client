import { PasswordCard } from './password.card'
import * as _ from 'lodash'

export class PasswordList {
  private _items: PasswordCard[]

  constructor () {
    this._items = []
  }

  get items (): PasswordCard[] {
    return this._items
  }

  public getLength ():number {
    return this._items.length
  }

  /**
   * Inserts an item into the todolist
   */
  public addItem (item: PasswordCard): void {
    let found = false
    _.each(this.items, i => {
      if (i === item) {
        found = true
        return false
      }
      return true
    })

    // Add an item
    if (found) {
      throw new Error('This item has already been registered!')
    }

    this._items.push(item)
  }

  /**
   * @todo: implement me!
   */
  public removeItem (item: PasswordCard): boolean {
    return false
  }
}
