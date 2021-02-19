import * as _ from 'lodash'
import { Component } from 'react'

/**
 * Helper class to be able to bind and programmatically update React components related to this model
 */
export class ReactComponentLinkedModel {
  private readonly boundComponents: Component[]

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

  public refreshLinkedComponents () {
    this.sanitizeBoundComponents()
    _.each(this.boundComponents, (cmp:Component) => {
      cmp.setState({})
    })
  }

  /**
   * If the browser window is closed or reloaded, the DOM elements will be dead so must be removed from the list
   * Ref.: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Dead_object
   * @todo: if (Components.utils.isDeadWrapper(obj)) {} - would be cleaner
   *
   * @private
   */
  private sanitizeBoundComponents () {
    if (!_.isEmpty(this.boundComponents)) {
      _.remove(this.boundComponents, DOMElement => {
        let isDead = false
        try {
          String(DOMElement)
        } catch (e) {
          isDead = true
        }
        return isDead
      })
    }
  }
}
