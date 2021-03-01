import { log } from '../../../lib/util/unified.logger'
import React, { Component } from 'react'
import { PasswordTable } from './password.table'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'
// import * as _ from 'lodash'

export default class PasswordsApp extends Component {
  constructor (props: any) {
    super(props)
    log('PasswordsApp created.')
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
              <PasswordTable />
            </div>
        </main>
    )
  }
}
