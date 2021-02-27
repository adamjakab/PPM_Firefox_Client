import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'
import { getProjectConfigValue } from '../../../lib/util/utils'

export default class Info extends Component {
  title = getProjectConfigValue('title')
  version = 'v' + getProjectConfigValue('version')

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    return <main role="main" className="container-fluid app info">
      <div className="head">
        <h1>{t('title_info')}</h1>
      </div>
      <div className="main">
        <p className="lead">Welcome to {this.title} {this.version}.</p>
      </div>
    </main>
  }
}
