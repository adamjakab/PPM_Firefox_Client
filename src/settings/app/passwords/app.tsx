import React, { Component } from 'react'
import { PasswordTable } from './password.table'
import { getPPMApp } from '../../../lib/util/utils'
import { PasswordList } from '../../../lib/model/password.list'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'
// import * as _ from 'lodash'

interface componentState {
  passwordList: PasswordList
}

export default class PasswordsApp extends Component {
  state: componentState

  constructor (props: any) {
    super(props)

    this.state = {
      passwordList: new PasswordList()
    }
  }

  refreshPasswordList = async () => {
    const PPMApp = await getPPMApp()
    const pwl = await PPMApp.dataProvider.getPasswordList()
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
        <main role="main" className="container-fluid app passwords">
            <div className="head">
                <h1>{t('title_passwords')}</h1>
            </div>
            <div className="main table-responsive">
              <PasswordTable pwdlist={this.state.passwordList} refresh={this.refreshPasswordList}/>
            </div>
        </main>
    )
  }
}
