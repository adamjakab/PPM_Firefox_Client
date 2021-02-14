import * as _ from 'lodash'
import { PPMApp } from '../../background/app/PPMApp'
import { browser } from 'webextension-polyfill-ts'

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
