/**
 * SETTINGS ENTRY POINT
 */
import * as _ from 'lodash'
import { registerApplication, start } from 'single-spa'
import * as Activity from './activity.functions'

const registerApps = () => {
  registerApplication({
    name: 'navbar',
    app: () => import('./app/navbar/lifecycle'),
    activeWhen: Activity.navbar,
    customProps: { title: 'PASSWORDS' }
  })

  registerApplication({
    name: 'footer',
    app: () => import('./app/footer/lifecycle'),
    activeWhen: Activity.footer,
    customProps: { title: 'Paranoia Password Manager', version: 'v0.0.1' }
  })

  registerApplication({
    name: 'passwords',
    app: () => import('./app/passwords/lifecycle'),
    activeWhen: Activity.passwords,
    customProps: { title: 'PASSWORDS' }
  })

  registerApplication({
    name: 'settings',
    app: () => import('./app/settings/lifecycle'),
    activeWhen: Activity.settings,
    customProps: { title: 'Settings' }
  })

  registerApplication({
    name: 'info',
    app: () => import('./app/info/lifecycle'),
    activeWhen: Activity.info,
    customProps: { title: 'Add-on Info' }
  })
}

registerApps()
document.addEventListener('DOMContentLoaded', function () {
  start()
})
