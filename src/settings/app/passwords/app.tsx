import React, { Component } from 'react'
import PasswordTable from './password.table'
import { getBackgroundPage } from '../../../lib/util/utils'
import * as _ from 'lodash'

export interface componentProps {
  title: string
}

export interface componentState {
  items: any[];
}

export default class Passwords extends Component < componentProps > {
  state: componentState

  constructor (props: any) {
    super(props)
    this.state = {
      items: []
    }
  }

  componentDidMount () {
    this.getDataFromBackground().then((items) => {
      this.setState({ items: items })
    })
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  async getDataFromBackground () {
    const app = await getBackgroundPage()
    return await app.getPasscards()
  }

  render () {
    return <main role="main" className="container-fluid">
            <div className="settings-head">
                <h1>{this.props.title}</h1>
                <p className="lead">some passwords please...</p>
            </div>
            <div className="settings-main table-responsive">
              <PasswordTable items={this.state.items} />
            </div>
        </main>
  }
}
