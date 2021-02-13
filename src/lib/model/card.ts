import { ReactComponentLinkedModel } from './react.component.linked.model'

export class Card extends ReactComponentLinkedModel {
    private _id: string
    private _dateCreated: Date
    private _dateModified: Date
    private _identifier: string
    private _name: string

    protected _type: string

    constructor (data?: any) {
      super()
      if (data) {
        this._id = data.id
        this._dateCreated = data.dateCreated
        this._dateModified = data.dateModified
        this._identifier = data.identifier
        this._name = data.name
      }
    }

    get id (): string {
      return this._id
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

    get name (): string {
      return this._name
    }

    get type (): string {
      return this._type
    }
}
