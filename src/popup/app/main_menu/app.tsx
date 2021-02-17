import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'
import { DynamicMenu } from './dynamic.menu'
import { StaticMenu } from './static.menu'

export default class MainMenu extends Component {
  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    return (
      <div className="main_menu">
        <DynamicMenu />
        <hr />
        <StaticMenu />
      </div>
    )
  }
}
