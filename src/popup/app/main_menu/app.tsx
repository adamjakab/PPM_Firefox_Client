import { log } from '../../../lib/util/unified.logger'
import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'
import { DynamicMenu } from './dynamic.menu'
import { StaticMenu } from './static.menu'

export default class MainMenu extends Component {
  constructor (props:any) {
    super(props)
    log('Showing popup.')
  }

  componentWillUnmount () {
    log('Unmounting popup...')
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    log(error)
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
