import * as _ from 'lodash'

/**
 * Solves the location to tell the correct application ???
 */

function locationHasHash (location: Location, hashCollection: string | string[]) {
  const locationHash = location.hash || '#'
  if (!_.isArray(hashCollection)) {
    hashCollection = [hashCollection]
  }
  // console.log('Comparing location hash: ', locationHash + ' to: ' + JSON.stringify(hashCollection))
  return _.includes(hashCollection, locationHash)
}

/* Root path - Initial page */
export function mainMenu (location: Location) {
  return locationHasHash(location, '#')
}

export function login (location: Location) {
  return locationHasHash(location, '#login')
}

export function logout (location: Location) {
  return locationHasHash(location, '#logout')
}

export function header (location: Location) {
  return locationHasHash(location, ['#', '#login', '#logout'])
}
