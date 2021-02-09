import { PasswordCard } from './password.card'
import { Field, IDataHook } from 'model-react'

export class PasswordList {
  protected items = new Field([] as PasswordCard[])

  /**
   * Retrieves all of the items on the todolist
   * @param hook The data hook
   * @returns All items
   */
  public getItems (hook?: IDataHook): PasswordCard[] {
    return this.items.get(hook)
  }

  public getLength ():number {
    return this.getItems().length
  }

  /**
   * Inserts an item into the todolist
   * @param item The item to insert
   * @returns Whether the item was successfully added (doesn't allow duplicate items)
   */
  public addItem (item: PasswordCard): boolean {
    const items = this.getItems()

    // Make sure the item isn't already present
    if (items.includes(item)) return false

    // Add the item
    // @todo: I don't like this
    this.items.set([...items, item])
    return true
  }

  /**
   * Removes an item from the todolist
   * @param item The item to remove
   * @returns Whether the item was present and could be removed
   */
  public removeItem (item: PasswordCard): boolean {
    const items = this.getItems()

    // Get the items with the item removed/
    const remainingItems = items.filter(i => i !== item)

    // Check if anything was removed
    if (items.length === remainingItems.length) return false

    // Store the result
    this.items.set(remainingItems)
    return true
  }
}
