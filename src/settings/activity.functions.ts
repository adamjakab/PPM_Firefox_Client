import * as _ from 'lodash'

/**
 * Solves the location to tell the correct application ???
 */

function locationHasHash (location: Location, hash: string) {
  // console.log('Comparing location hash: ', location.hash + ' to: ' + hash)
  let hashCollection = ['#' + hash, '#/' + hash]
  if (_.isEmpty(hash)) {
    hashCollection = [hash]
  }
  return _.includes(hashCollection, location.hash)
}

/* Root path - Initial page */
export function passwords (location: Location) {
  return locationHasHash(location, '')
}

export function info (location: Location) {
  return locationHasHash(location, 'info')
}

export function settings (location: Location) {
  return locationHasHash(location, 'settings')
}

// Always present apps
export const navbar = (location: Location) => true
export const footer = (location: Location) => true
