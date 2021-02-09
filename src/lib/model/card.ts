import { Field, IDataHook } from 'model-react'

export class Card {
    private _id = new Field('');
    private _dateCreated: Date
    private _dateModified: Date
    private _identifier: string
    private _name = new Field('');

    protected _type: string

    constructor (data?: any) {
      if (data) {
        this.setId(data.id)
        this._dateCreated = data.dateCreated
        this._dateModified = data.dateModified
        this._identifier = data.identifier
        this.setName(data.name)
      }
    }

    public setId (value: string): void {
      this._id.set(value)
    }

    public getId (h?: IDataHook): string {
      return this._id.get(h)
    }

    get dateCreated (): Date {
      return this._dateCreated
    }

    get dateModified (): Date {
      return this._dateModified
    }

    get identifier (): string {
      return this._identifier
    }

    public setName (value: string): void {
      this._name.set(value)
    }

    public getName (h?: IDataHook): string {
      return this._name.get(h)
    }

    get type (): string {
      return this._type
    }
}
