/**
 * BACKGROUND ENTRY POINT
 */

// Utils
import * as _ from 'lodash'

// Import the PPMApp application
import { PPMApp } from './app/PPMApp'

// Create an instance of the PPMApp
const app = new PPMApp()

// Expose PPMApp to the world
_.set(window, 'PPMApp', app)

// Export all
export {
  app
}

// Run the application
app.run()
