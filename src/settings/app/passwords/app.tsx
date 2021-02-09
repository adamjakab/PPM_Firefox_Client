import React, { Component } from 'react'
import PasswordTable from './password.table'
import { DataTable } from './data.table'
import { PasswordDataLoader } from './password.data.loader'
import { getBackgroundPage } from '../../../lib/util/utils'
import * as _ from 'lodash'
import { PasswordCard } from '../../../lib/model/password.card'
import { PasswordList } from '../../../lib/model/password.list'
import { DataLoader, useDataHook } from 'model-react'

export interface componentProps {
  title: string
}

export interface componentState {
  passwordList: PasswordList | null;
}

export default class Passwords extends Component < componentProps > {
  state: componentState

  constructor (props: any) {
    super(props)
    this.state = {
      passwordList: null
    }
  }

  componentDidMount () {
    console.log('mounted')
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    const src = new DataLoader(async () => {
      const app = await getBackgroundPage()
      return await app.getPasscards()
    }, new PasswordList())

    return <main role="main" className="container-fluid">
            <div className="settings-head">
                <h1>{this.props.title}</h1>
            </div>
            <div className="settings-main table-responsive">
              {/* <DataTable pwdlist={this.state.passwordList} /> */}
              <PasswordDataLoader source={src} />
            </div>
        </main>
  }
}
