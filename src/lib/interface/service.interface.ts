import { PasswordList } from '../model/password.list'

/**
 * Collection of service interfaces
 */

export interface LoggerServiceInterface {
  log(zone?:string, message?: any, ...optionalParams: any[]): void
}

export interface DataProviderInterface {
  initialize(): Promise<void>
  getPasswordList() : Promise<PasswordList>
}

export interface ConfigurationProviderInterface {
  initialize(): Promise<void>
  loadProfile(profileName:string, encryptionKey:string, encryptionSchemeName:string): Promise<void>
}

export interface CryptorInterface {
  initialize(): Promise<void>
}
