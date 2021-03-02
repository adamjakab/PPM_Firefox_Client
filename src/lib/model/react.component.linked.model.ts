import * as _ from 'lodash'
import { Component } from 'react'

export interface ReactComponentLinkedModelInterface {
  registerReactComponent (component: Component): void

  unregisterReactComponent (component: Component): void

  refreshLinkedComponents (): void
}

/**
 * @class ReactComponentLinkedModel
 *
 * Helper class to facilitate the refresh of a related React component when the model changes
 */
export class ReactComponentLinkedModel implements ReactComponentLinkedModelInterface {
  private readonly boundComponents: Component[]

  constructor () {
    this.boundComponents = []
  }

  /**
   * Call this method to trigger the refresh of all bound react components.
   */
  public refreshLinkedComponents () {
    this.sanitizeBoundComponents()
    _.each(this.boundComponents, (cmp: Component) => {
      cmp.setState({})
    })
  }

  public registerReactComponent (component: Component) {
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

  public unregisterReactComponent (component: Component) {
    _.remove(this.boundComponents, cmp => {
      return cmp === component
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
