import React, { Component } from 'react'
import { ModelAwareComponent } from '../../../lib/component/model.aware.component'
import { PasswordCard } from '../../../lib/model/password.card'
import { PasswordList } from '../../../lib/model/password.list'
import { log } from '../../../lib/util/unified.logger'
import * as _ from 'lodash'

// ------------------------------------------------------------------------------------| Password Table |
interface PasswordTableComponentState {
  passwordList: PasswordList,
}
// extends ModelAwareComponent <{pwdlist:PasswordList, refresh:any}>
// extends Component <{pwdlist:PasswordList, refresh:any}> {
export class PasswordTable extends Component <{pwdlist:PasswordList, refresh:any}> {
  state: PasswordTableComponentState

  constructor (props: any) {
    super(props)
    log('PasswordTable created.')
  }

  render () {
    let tbody, itemCount
    if (_.isUndefined(this.props.pwdlist)) {
      itemCount = 0
      tbody = <tr><td colSpan={3} className={'nodata'}>No data</td></tr>
    } else {
      itemCount = this.props.pwdlist.getLength()
      tbody = this.props.pwdlist.items.map((item) => (
          <PasswordRow key={item.id} passcard={item} />
      ))
    }
    return (
      <div>
        <span>Count: {itemCount} </span>
        <br/>
        <button onClick={this.props.refresh} type="button" className={'btn btn-outline-warning'}>Refresh list</button>
        <table className="password table table-bordered table-striped table-hover">
          <thead className="thead-dark">
          <tr>
            <th className={'id'}>ID</th>
            <th className={'name'}>Name</th>
            <th className={'text'}>Text</th>
          </tr>
          </thead>
          <tbody>
            {tbody}
          </tbody>
        </table>
      </div>
    )
  }
}

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
