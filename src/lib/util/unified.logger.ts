import { getPPMApp } from './utils'
import _ from 'lodash'
import { LoggerServiceInterface } from '../interface/service.interface'

/**
 * A handy log() function that will pass log messages to the LoggerService running in the background
 */
let loggerService: LoggerServiceInterface

export const log = (message?: any, ...optionalParams: any[]) => {
  getLoggerService().then(() => {
    loggerService.log(message, ...optionalParams)
  })
}

const getLoggerService = async () => {
  return new Promise<void>((resolve, reject) => {
    if (!_.isUndefined(loggerService)) {
      return resolve()
    }
    getPPMApp().then((PPMApp) => {
      loggerService = PPMApp.loggerService
      resolve()
    })
  })
}
