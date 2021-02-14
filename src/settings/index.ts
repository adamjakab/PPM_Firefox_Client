/**
 * SETTINGS ENTRY POINT
 */
import { registerApplication, start } from 'single-spa'
import * as Activity from './activity.functions'

const registerApps = () => {
  registerApplication({
    name: 'navbar',
    app: () => import('./app/navbar/lifecycle'),
    activeWhen: Activity.navbar
  })

  registerApplication({
    name: 'footer',
    app: () => import('./app/footer/lifecycle'),
    activeWhen: Activity.footer
  })

  registerApplication({
    name: 'passwords',
    app: () => import('./app/passwords/lifecycle'),
    activeWhen: Activity.passwords
  })

  registerApplication({
    name: 'settings',
    app: () => import('./app/settings/lifecycle'),
    activeWhen: Activity.settings
  })

  registerApplication({
    name: 'info',
    app: () => import('./app/info/lifecycle'),
    activeWhen: Activity.info
  })
}

registerApps()
document.addEventListener('DOMContentLoaded', function () {
  start()
})
