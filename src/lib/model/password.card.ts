import { Card } from './card'

export class PasswordCard extends Card {
  private _text: string

  constructor (data?: any) {
    super(data)
    this._type = 'passwordX'
    if (data) {
      this._text = data.text
    }
  }
}
