import { Component } from 'react'
import { ReactComponentLinkedModel } from '../model/react.component.linked.model'

export class ModelAwareComponent<P = any, S = any> extends Component<P, S> {
  protected _model: ReactComponentLinkedModel

  protected registerModel (model:any) {
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
