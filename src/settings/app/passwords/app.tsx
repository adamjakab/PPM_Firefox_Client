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
  passwordList1: any;
  dataLoaderSource: any;
}

export default class Passwords extends Component < componentProps > {
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

    /*
    const pwdList2 = new PasswordList()
    const myDataLoaderSource = new DataLoader(async () => {
      const app = await getBackgroundPage()
      const newPwdList = await app.getPasscards()
      return newPwdList
    }, pwdList2)
    */
    this.state = {
      passwordList1: pwdList1,
      dataLoaderSource: null
    }
  }

  componentDidMount () {
    console.log('mounted')
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    return <main role="main" className="container-fluid">
            <div className="settings-head">
                <h1>{this.props.title}</h1>
            </div>
            <div className="settings-main table-responsive">
              <DataTable pwdlist={this.state.passwordList1} />
              {/* <PasswordDataLoader source={this.state.dataLoaderSource} /> */}
            </div>
        </main>
  }
}
