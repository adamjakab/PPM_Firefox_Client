import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'
import { getProjectConfigValue } from '../../../lib/util/utils'

type componentProps = {
    title: string,
    version: string,
}

export default class Footer extends Component < componentProps > {
  version = 'v' + getProjectConfigValue('version')

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    return <footer className="footer">
        <div className="container-fluid">
            <span className="text-muted">{t('extension_name')} {this.version}</span>
        </div>
    </footer>
  }
}
