import { browser } from 'webextension-polyfill-ts'

export class PPMApp {
  public doSomething (msg:string) {
    console.log('Fico: ' + msg)
  }
}
