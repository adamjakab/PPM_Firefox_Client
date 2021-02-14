import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'

type componentProps = {
    title: string,
}

export default class Navbar extends Component < componentProps > {
  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    return <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <a className="navbar-brand" href="">{t('extension_name_short')}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDefault"
                    aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">{t('title_passwords')}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#settings">{t('title_settings')}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#info">{t('title_info')}</a>
                    </li>
                </ul>
            </div>
        </nav>
  }
}
