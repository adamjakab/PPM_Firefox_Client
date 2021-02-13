import React, { Component } from 'react'
import { PasswordTable } from './data.table'
import { getBackgroundPage } from '../../../lib/util/utils'
import * as _ from 'lodash'
import { PasswordCard } from '../../../lib/model/password.card'
import { PasswordList } from '../../../lib/model/password.list'

export interface componentProps {
  title: string
}

interface componentState {
  passwordList: PasswordList;
  passwordList2: PasswordList;
}

export default class PasswordsApp extends Component < componentProps > {
  state: componentState

  constructor (props: any) {
    super(props)

    const pwdList1 = new PasswordList()
    const pc = new PasswordCard({
      id: 0,
      name: 'SUPERFICOOOO',
      text: '___',
      dateCreated: new Date(),
      dateUpdated: new Date(),
      identifier: 'i_x'
    })
    pwdList1.addItem(pc)

    const pwdList2 = new PasswordList()
    this.state = {
      passwordList: pwdList1,
      passwordList2: pwdList2
    }
  }

  componentDidMount () {
    console.log('PasswordsApp did mount.')
    getBackgroundPage().then(bg => {
      bg.logToConsole('got BG')
      const pwl = bg.getPasswordList1()
      console.log('Got new list of passwords: ' + pwl.getLength())
      this.setState({ passwordList2: pwl })
    })
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    return (
        <main role="main" className="container-fluid">
            <div className="settings-head">
                <h1>{this.props.title}</h1>
            </div>
            <h3>PWL-1</h3>
            <div className="settings-main table-responsive">
              <PasswordTable pwdlist={this.state.passwordList} />
            </div>
            <h3>PWL-2</h3>
            <div className="settings-main table-responsive">
              <PasswordTable pwdlist={this.state.passwordList2} />
            </div>
        </main>
    )
  }
}
