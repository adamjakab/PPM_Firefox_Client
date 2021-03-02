import { ReactComponentLinkedModel } from './react.component.linked.model'
import { PasswordCard } from './password.card'
import * as _ from 'lodash'

export class PasswordList extends ReactComponentLinkedModel {
  private _items: PasswordCard[]

  constructor () {
    super()
    this._items = []
  }

  get items (): PasswordCard[] {
    return this._items
  }

  public getLength (): number {
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
    this.refreshLinkedComponents()
  }

  /**
   * Remove an item at a specific position
   */
  public removeItemAt (index: number): void {
    index = index >= 0 ? index : 0
    index = index < this.getLength() ? index : this.getLength() - 1
    this._items.splice(index, 1)
    this.refreshLinkedComponents()
  }

  /**
   * @todo: implement me!
   */
  public removeItem (item: PasswordCard): boolean {
    return false
  }

  public resetWithPasswordList (lst: PasswordList) {
    this._items = []
    _.each(lst.items, pwd => {
      this._items.push(pwd)
    })
  }
}
