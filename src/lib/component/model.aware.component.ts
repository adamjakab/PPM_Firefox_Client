import { Component } from 'react'
import { ReactComponentLinkedModelInterface } from '../model/react.component.linked.model'

/**
 * @class ModelAwareComponent
 *
 * This class facilitates the registration / unregistration of a React component with the model which, when updated
 * will be able to refresh the component.
 */
export class ModelAwareComponent<P = any, S = any> extends Component<P, S> {
  protected _model: ReactComponentLinkedModelInterface

  protected registerModel (model: ReactComponentLinkedModelInterface) {
    this._model = model
    this._model.registerReactComponent(this)
  }

  protected unregisterModel () {
    this._model.unregisterReactComponent(this)
  }

  componentWillUnmount () {
    this.unregisterModel()
  }
}
