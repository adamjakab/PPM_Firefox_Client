import { Card } from './card'

export class PasswordCard extends Card {
  private _text: string
  private _counter = 0

  constructor (data?: any) {
    super(data)
    this._type = 'password'
    if (data) {
      this._text = data.text
    }

    setInterval(this.increaseCounter, 500)
  }

  protected increaseCounter = () => {
    this._counter++
    this._text = 'CNT____' + this._counter
    this.refreshLinkedComponents()
  }

  get text (): string {
    return this._text
  }
}
