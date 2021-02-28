import { getPPMApp } from './utils'
import _ from 'lodash'
import { LoggerServiceInterface } from '../interface/service.interface'

let loggerService:LoggerServiceInterface

const getLoggerService = async () => {
  const PPMApp = await getPPMApp()
  loggerService = PPMApp.loggerService
}

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
  const _log = (message?: any, ...optionalParams: any[]) => {
    const zone = getCallerFromStack()
    loggerService.log(zone, message, ...optionalParams)
  }

  if (_.isUndefined(loggerService)) {
    getLoggerService().then(() => {
      _log(message, ...optionalParams)
    })
  } else {
    _log(message, ...optionalParams)
  }
}
