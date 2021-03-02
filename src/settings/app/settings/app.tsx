import React, { Component, SyntheticEvent } from 'react'
import { getTranslatedMessage as t } from '../../../lib/util/I18n'
import { log } from '../../../lib/util/unified.logger'
import { Configuration, ConfigurationData } from '../../../background/configuration/configuration'
import { getPPMApp } from '../../../lib/util/utils'
import _ from 'lodash'

export default class Settings extends Component {
  state: ConfigurationData

  constructor (props: any) {
    super(props)

    const cfg = new Configuration()
    this.state = cfg.getAll()

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    getPPMApp().then((PPMApp) => {
      return PPMApp.configurationProvider.getConfiguration()
    }).then((config) => {
      const configData = config.getAll()
      this.setState(config.getAll())
      log('Initializing with config: ' + JSON.stringify(configData))
    })
  }

  handleChange (event: SyntheticEvent) {
    const target: any = event.target
    const stateClone = _.clone(this.state)
    switch (target.id) {
      case 'log_to_console':
        _.set(stateClone, 'logger.do_console_logging', target.checked)
        this.setState(stateClone)
        log('SET(' + target.id + '): ', target.checked)
        break
      case 'test_element':
        _.set(stateClone, 'logger.test_element', target.value)
        this.setState(stateClone)
        log('SET(' + target.id + '): ', target.value)
        break
      default:
        log('Unhandled change target(' + target.id + '): ', target.value)
    }
  }

  async handleSubmit (event: SyntheticEvent) {
    event.preventDefault()
    log('Updating configuration with: ', this.state)
    getPPMApp().then((PPMApp) => {
      return PPMApp.configurationProvider.resetConfiguration(this.state)
    }).then(() => {
      log('Configuration has been reset and stored.')
    })
  }

  render () {
    return <main role="main" className="container-fluid app settings">
      <div className="head">
        <h1>{t('title_settings')}</h1>
      </div>
      <div className="main">
        <form onSubmit={this.handleSubmit}>
          <div className="form-check">
            <input type="checkbox" checked={this.state.logger.do_console_logging} className="form-check-input"
                   id="log_to_console" onChange={this.handleChange}/>
            <label className="form-check-label" htmlFor="log_to_console">Log to console</label>
          </div>
          <div className="form-group">
            <label htmlFor="test_element">Test Element</label>
            <input type="text" value={this.state.logger.test_element} className="form-control" id="test_element"
                   aria-describedby="testHelp" placeholder="Write something" onChange={this.handleChange}/>
            <small id="testHelp" className="form-text text-muted">This will become very secret.</small>
          </div>
          <button type="submit" className="btn btn-primary mb-2">Save</button>
        </form>
      </div>
    </main>
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }
}
