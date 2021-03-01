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
    setInterval(this.increaseCounter, 1000)
  }

  protected increaseCounter = () => {
    this._counter++
    this.text = 'CNT___' + this._counter
  }

  get text (): string {
    return this._text
  }

  set text (value: string) {
    this._text = value
    this.refreshLinkedComponents()
  }
}
