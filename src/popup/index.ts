import { browser } from 'webextension-polyfill-ts'
import * as _ from 'lodash'
import { getBackgroundPage } from '../lib/util/utils'
/**
 * POPUP ENTRY POINT
 */
const y = 2

async function testBg () {
  const app = await getBackgroundPage()
  app.doSomething('INIT-2')
}

testBg()
