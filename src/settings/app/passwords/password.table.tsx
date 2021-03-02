import React from 'react'
import { ModelAwareComponent } from '../../../lib/component/model.aware.component'
import { PasswordCard } from '../../../lib/model/password.card'
import { PasswordList } from '../../../lib/model/password.list'
import { log } from '../../../lib/util/unified.logger'
import * as _ from 'lodash'
import { getPPMApp } from '../../../lib/util/utils'

// ------------------------------------------------------------------------------------| Password Table |
export class PasswordTable extends ModelAwareComponent {
  _model: PasswordList

  constructor (props: any) {
    super(props)
    log('PasswordTable created.')
  }

  componentDidMount () {
    this.refreshPasswordList().then(() => {
      log('Password list refreshed')
    })
  }

  refreshPasswordList = async () => {
    const PPMApp = await getPPMApp()
    const passwordList = await PPMApp.dataProvider.getPasswordList()
    this.registerModel(passwordList)
    this.setState({})
  }

  render () {
    let tbody, itemCount
    if (_.isUndefined(this._model)) {
      itemCount = 0
      tbody = <tr>
        <td colSpan={3} className={'nodata'}>No data</td>
      </tr>
    } else {
      itemCount = this._model.getLength()
      tbody = this._model.items.map((item) => (
        <PasswordRow key={item.id} passcard={item}/>
      ))
    }
    return (
      <div>
        <small>Count: {itemCount}</small>
        <br/>
        <button onClick={this.refreshPasswordList} type="button"
                className={'btn btn-outline-warning float-right'}>Refresh list
        </button>
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
class PasswordRow extends ModelAwareComponent <{ passcard: PasswordCard }> {
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
