import { getBackgroundPage } from './utils'
import _ from 'lodash'

// Make sure log events are dispatched in the background window
let backgroundWindow:Window = window
getBackgroundPage().then(win => {
  backgroundWindow = win
})

const getCallerFromStack = ():string => {
  let caller = ''
  const stack = new Error('I was called').stack
  if (stack) {
    const stackArray = stack.split(/\n/)
    const callerLine = stackArray[2]
    if (callerLine) {
      // initialize/<@webpack-internal:///./src/background/cryptor/cryptor.ts:11:30
      const callerParts = callerLine.split(/[@:]/)
      // console.log('Caller Parts: ', callerParts)
      const filePath = callerParts[2]
      let fileName = _.last(filePath.split('/'))
      fileName = fileName ? fileName.replace(/\.[^/.]+$/, '') : '???'
      caller = fileName
    }
    // console.log('Full stacktrace: ', stackArray)
  }
  return caller
}

export const log = (message?: any, ...optionalParams: any[]) => {
  const zone = getCallerFromStack()
  backgroundWindow.dispatchEvent(new CustomEvent('PPM',
    {
      detail: {
        type: 'log.message',
        value: 'info',
        zone: zone,
        message: message,
        optionalParams: optionalParams
      },
      bubbles: true,
      cancelable: true
    }
  ))
}
