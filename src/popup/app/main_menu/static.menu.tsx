import { log } from '../../../lib/util/unified.logger'
import React, { Component, SyntheticEvent } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'
import { browser } from 'webextension-polyfill-ts'
import _ from 'lodash'

export class StaticMenu extends Component {
  openConfigurationsTab = (e:SyntheticEvent) => {
    e.preventDefault()
    browser.tabs.create({ url: 'settings.html' }).then(() => {
      log('Settings opened')
      window.close()
      return true
    })
  }

  render () {
    return (
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#">New Passcard</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Password Generator</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={this.openConfigurationsTab}>Configuration</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Info</a>
        </li>
      </ul>
    )
  }
}
