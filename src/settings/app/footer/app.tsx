import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'

type componentProps = {
    title: string,
    version: string,
}

export default class Footer extends Component < componentProps > {
  // @todo: get the real version number from the package.json file
  version = 'v0.0.2'

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
