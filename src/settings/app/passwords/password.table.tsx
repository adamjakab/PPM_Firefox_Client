import React from 'react'

export interface componentProps {
  items: any[];
}

export interface componentState {
  items: any[];
}

export default class PasswordTable extends React.Component<componentProps> {
  state: componentState

  constructor (props:componentProps) {
    super(props)
    this.state = {
      items: props.items
    }
  }

  render () {
    return (
      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark">
        <tr>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {this.props.items.map(item => (
          <tr key={item.id}>
            <td>
              {item.name}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    )
  }
}
