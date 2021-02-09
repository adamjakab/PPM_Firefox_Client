import React from 'react'
import { useDataHook } from 'model-react'

export interface componentProps {
  items: any[];
}

export interface componentState {
  x: number
}

export default class PasswordTable extends React.Component<componentProps> {
  state: componentState

  constructor (props:componentProps) {
    super(props)
    this.state = {
      x: 1
    }
  }

  componentDidUpdate (prevProps: Readonly<componentProps>, prevState: componentState) {
    console.log('UPD: ' + this.props.items[0].text)
  }

  render () {
    const [h] = useDataHook()
    return (
      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>Description</th>
        </tr>
        </thead>
        <tbody>
        {this.props.items.map(item => (
          <tr key={item.id}>
            <td>
              {item.name}
            </td>
            <td>
              {item.getText(h)}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    )
  }
}
