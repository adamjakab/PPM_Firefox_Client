import * as _ from 'lodash'
import { PPMApp } from '../../background/app/PPMApp'
import { browser } from 'webextension-polyfill-ts'

export const getProjectConfigValue = (path: string, defaultValue: any = undefined) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pkgDef = require('../../../package.json')
  return _.get(pkgDef, path, defaultValue)
}

/**
 * Returns global variable
 */
export function getWindow (): any {
  return window
}

/**
 * Returns the background application instance
 */
export async function getBackgroundPage (): Promise<Window> {
  return await browser.runtime.getBackgroundPage()
}

/**
 * Returns the background application instance
 */
export async function getPPMApp (): Promise<PPMApp> {
  const bgp = await getBackgroundPage()
  return _.get(bgp, 'PPMApp')
}

// @todo: a better one?
export function getRandomString (length = 8) {
  let s = ''
  const randomChar = () => {
    const n = Math.floor(Math.random() * 62)
    if (n < 10) {
      return n
    } // 1-10
    if (n < 36) {
      return String.fromCharCode(n + 55)
    } // A-Z
    return String.fromCharCode(n + 61) // a-z
  }
  while (length--) {
    s += randomChar()
  }
  return s
}
