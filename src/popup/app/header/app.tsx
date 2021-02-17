import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'

export default class Header extends Component {
  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    return (
      <div className="header">
        <img className="logo" src="images/paranoia_64.png"/>
        <h1>{t('extension_name')}</h1>
      </div>
    )
  }
}
