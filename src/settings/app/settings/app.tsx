import React, { Component } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'
import Logger from '../../../background/logger/logger'
import { Configuration, ConfigurationData } from '../../../background/configuration/configuration'
import { getPPMApp } from '../../../lib/util/utils'

const log = (message?: any, ...optionalParams: any[]) => {
  Logger.log('ST/Settings', message, ...optionalParams)
}

interface componentState {
  configuration: ConfigurationData
}

export default class Settings extends Component {
  state: componentState

  constructor (props:any) {
    super(props)

    this.state = {
      configuration: new Configuration().getAll()
    }
  }

  componentDidMount () {
    getPPMApp().then((PPMApp) => {
      return PPMApp.configurationProvider.getConfiguration()
    }).then((config) => {
      const configData = config.getAll()
      this.setState({ configuration: configData })
      log('Got config after mount: ' + JSON.stringify(configData))
    })
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    return <main role="main" className="container-fluid app settings">
      <div className="head">
        <h1>{t('title_settings')}</h1>
      </div>
      <div className="main">
        <p className="lead">Some settings will be here soon...</p>
      </div>
    </main>
  }
}
