import React, { Component } from 'react'

export class DynamicMenu extends Component {
  render () {
    return (
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="#">PwdCard 1</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">PwdCard 2</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">PwdCard 3</a>
        </li>
      </ul>
    )
  }
}
