import React, { Component } from 'react'
import { ModelAwareComponent } from '../../../lib/component/model.aware.component'
import { PasswordCard } from '../../../lib/model/password.card'
import { PasswordList } from '../../../lib/model/password.list'

// ------------------------------------------------------------------------------------| Password Row |
class PasswordRow extends ModelAwareComponent <{passcard:PasswordCard}> {
  _model: PasswordCard

  constructor (props: any) {
    super(props)
    this.registerModel(this.props.passcard)
  }

  render () {
    return (
      <tr>
        <td>{this._model.id}</td>
        <td>{this._model.name}</td>
        <td>{this._model.text}</td>
      </tr>
    )
  }
}

// ------------------------------------------------------------------------------------| Password Table |
interface PasswordTableComponentState {
  passwordList: PasswordList
}

export class PasswordTable extends Component <{pwdlist:PasswordList}> {
  state: PasswordTableComponentState

  constructor (props: any) {
    super(props)
    this.state = {
      passwordList: props.pwdlist
    }
  }

  render () {
    return (
      <div>
        <span>Pwd count: {this.state.passwordList.getLength()}</span>
        <table className="table table-bordered table-striped table-hover">
          <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Text</th>
          </tr>
          </thead>
          <tbody>
          {this.state.passwordList.items.map((item) => (
            <PasswordRow key={item.id} passcard={item} />
          ))}
          </tbody>
        </table>
      </div>
    )
  }
}
