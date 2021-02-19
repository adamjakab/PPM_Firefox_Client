import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'
import Logger from '../../../background/logger/logger'
import * as _ from 'lodash'

interface componentState {
  locationHash: string
}

export default class Navbar extends Component {
  state: componentState

  constructor (props:any) {
    super(props)
    this.state = {
      locationHash: location.hash
    }
  }

  public applicationHashChange () {
    this.setState({ locationHash: location.hash })
    Logger.log('New Hash: ' + this.state.locationHash)
  }

  getNavItemClasses (href:string) {
    const classes = ['nav-item']
    if (href === this.state.locationHash) {
      classes.push('active')
    }
    return classes.join(' ')
  }

  componentDidMount () {
    window.addEventListener('hashchange', this.applicationHashChange.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('hashchange', this.applicationHashChange.bind(this))
  }

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
                    <li className={this.getNavItemClasses('')}>
                        <a className="nav-link" href="#">{t('title_passwords')}</a>
                    </li>
                    <li className={this.getNavItemClasses('#settings')}>
                        <a className="nav-link" href="#settings">{t('title_settings')}</a>
                    </li>
                    <li className={this.getNavItemClasses('#info')}>
                        <a className="nav-link" href="#info">{t('title_info')}</a>
                    </li>
                </ul>
            </div>
        </nav>
  }
}
