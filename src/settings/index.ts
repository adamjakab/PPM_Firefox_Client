/**
 * SETTINGS ENTRY POINT
 */
import * as _ from 'lodash'
import type { Browser, Cookies } from 'webextension-polyfill-ts'

const z = { name: 'yeppa' }
const a = _.get(z, 'name')
console.log('Settings: ' + a)
