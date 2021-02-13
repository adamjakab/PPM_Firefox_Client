import React, { Component } from 'react'
import { PasswordTable } from './data.table'
import { getBackgroundPage } from '../../../lib/util/utils'
import * as _ from 'lodash'
import { PasswordList } from '../../../lib/model/password.list'

export interface componentProps {
  title: string
}

interface componentState {
  passwordList: PasswordList;
}

export default class PasswordsApp extends Component < componentProps > {
  state: componentState

  constructor (props: any) {
    super(props)

    this.state = {
      passwordList: new PasswordList()
    }
  }

  componentDidMount () {
    getBackgroundPage().then(bg => {
      bg.logToConsole('got BG')
      const pwl = bg.getPasswordList1()
      console.log('Got new list of passwords: ' + pwl.getLength())
      this.state.passwordList.resetWithPasswordList(pwl)
      this.setState({})
      bg.getPasswordList2().then(pwl => {
        this.state.passwordList.resetWithPasswordList(pwl)
        this.setState({})
      })
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
        </main>
    )
  }
}
