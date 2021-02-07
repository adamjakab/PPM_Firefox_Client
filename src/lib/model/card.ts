
export class Card {
    private _id: string
    private _dateCreated: Date
    private _dateModified: Date
    private _identifier: string
    private _name: string

    protected _type: string

    constructor (data?: any) {
      if (data) {
        this._id = data.id
        this._dateCreated = data.dateCreated
        this._dateModified = data.dateModified
        this._identifier = data.identifier
        this._name = data.name
      }
    }
}
