import { Card } from './card'
import { Field, IDataHook } from 'model-react'

export class PasswordCard extends Card {
  private _text = new Field('');
  private _counter = 0

  constructor (data?: any) {
    super(data)
    this._type = 'password'
    if (data) {
      this.setText(data.text)
    }
    this.increaseCounter()
  }

  protected increaseCounter = () => {
    this._counter++
    this.setText('CNT___' + this._counter)
    // console.log(this._counter)
    setTimeout(this.increaseCounter, 500 + Math.random() * 500)
  }

  public setText (value: string): void {
    this._text.set(value)
  }

  public getText (h?: IDataHook): string {
    return this._text.get(h)
  }
}
