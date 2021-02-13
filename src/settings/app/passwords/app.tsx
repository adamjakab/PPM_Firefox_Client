import React, { Component } from 'react'
import { PasswordTable } from './password.table'
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

  refreshPasswordList = async () => {
    const bg = await getBackgroundPage()
    bg.logToConsole('got BG')
    const pwl = await bg.getPasswordList()
    this.state.passwordList.resetWithPasswordList(pwl)
    this.setState({})
  }

  componentDidMount () {
    this.refreshPasswordList().then(() => {
      console.log('Password list refreshed')
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
            <div className="settings-main table-responsive">
              <PasswordTable pwdlist={this.state.passwordList} refresh={this.refreshPasswordList}/>
            </div>
        </main>
    )
  }
}
