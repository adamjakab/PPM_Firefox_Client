import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'

export default class Info extends Component {
  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    return <main role="main" className="container-fluid">
      <div className="settings-main">
        <h1>{t('title_info')}</h1>
        <p className="lead">Put some info here...</p>
      </div>
    </main>
  }
}
