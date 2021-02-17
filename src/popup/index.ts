/**
 * POPUP ENTRY POINT
 */
import { registerApplication, start } from 'single-spa'
import * as Activity from './activity.functions'

const registerApps = () => {
  registerApplication({
    name: 'main_menu',
    app: () => import('./app/main_menu/lifecycle'),
    activeWhen: Activity.mainMenu
  })
  registerApplication({
    name: 'header',
    app: () => import('./app/header/lifecycle'),
    activeWhen: Activity.header
  })
}

registerApps()
document.addEventListener('DOMContentLoaded', function () {
  start()
})
