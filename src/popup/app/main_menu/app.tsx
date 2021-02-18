import Logger from '../../../background/logger/logger'
import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'
import { DynamicMenu } from './dynamic.menu'
import { StaticMenu } from './static.menu'

const log = (message?: any, ...optionalParams: any[]) => {
  Logger.log('PU/MainMenu', message, ...optionalParams)
}

export default class MainMenu extends Component {
  constructor (props:any) {
    super(props)
    log('Showing...')
  }

  componentWillUnmount () {
    log('Unmounting...')
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
