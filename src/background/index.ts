/**
 * BACKGROUND ENTRY POINT
 */

// Utils
import * as _ from 'lodash'

// Lib Utils
import { getBackgroundPage } from '../lib/util/utils'

// Application
import { PPMApp } from './app/PPMApp'

const app = new PPMApp()
_.set(window, 'app', app)

// Export all
export {
  app,
  getBackgroundPage
}

app.doSomething('INIT-1')
