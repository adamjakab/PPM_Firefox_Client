import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'

export default class Settings extends Component {
  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    return <main role="main" className="container-fluid app settings">
      <div className="head">
        <h1>{t('title_settings')}</h1>
      </div>
      <div className="main">
        <p className="lead">Some settings will be here soon...</p>
      </div>
    </main>
  }
}
