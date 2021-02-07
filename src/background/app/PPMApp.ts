import { browser } from 'webextension-polyfill-ts'

export class PPMApp {
  public doSomething (msg:string) {
    console.log('Fico: ' + msg)
  }

  public async getPasscards () {
    return new Promise<any[]>((resolve, reject) => {
      const _items = [
        { id: 1, name: 'Reservoir Dogs' },
        { id: 2, name: 'Airplane' },
        { id: 3, name: 'Doctor Zhivago' },
        { id: 4, name: 'Memento' },
        { id: 5, name: 'Braveheart' },
        { id: 6, name: 'Beauty and the Beast' },
        { id: 7, name: 'Seven' }
      ]
      resolve(_items)
    })
  }
}
