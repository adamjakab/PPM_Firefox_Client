import * as _ from 'lodash'
import { Component } from 'react'

/**
 * Helper class to be able to bind and manually update React components related to this model
 */
export class ReactComponentLinkedModel {
  private boundComponents: Component[]

  constructor () {
    this.boundComponents = []
  }

  public registerReactComponent (component:Component) {
    let found = false
    _.each(this.boundComponents, cmp => {
      if (cmp === component) {
        found = true
        return false
      }
      return true
    })
    if (!found) {
      this.boundComponents.push(component)
    }
  }

  public unregisterReactComponent (component:Component) {
    _.remove(this.boundComponents, cmp => {
      return cmp === component
    })
  }

  public rerenderLinkedComponents () {
    _.each(this.boundComponents, (cmp:Component) => {
      cmp.setState({})
    })
  }
}
