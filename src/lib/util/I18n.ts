import { browser } from 'webextension-polyfill-ts'
import * as _ from 'lodash'

// const lang = 'en'

/**
 * Translate a string from locales
 * @param key
 * @param substitutions
 */
export const getTranslatedMessage = (key:string, substitutions?:any):string => {
  let translated = browser.i18n.getMessage(key, substitutions)
  if (_.isEmpty(translated)) {
    console.log('I18n - Missing translation required: ' + key)
    translated = key
  }
  return translated
}
