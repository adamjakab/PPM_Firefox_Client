/**
 * BACKGROUND ENTRY POINT
 */

// Imports
import * as _ from 'lodash'
import { PPMApp } from './app/PPMApp'

if (!_.has(window, 'PPMApp')) {
  // Create an instance of the PPMApp
  const app = new PPMApp()

  // Expose the PPMApp instance to the world
  _.set(window, 'PPMApp', app)

  // Run it
  app.run()
}
