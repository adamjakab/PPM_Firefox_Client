import React, { Component } from 'react'

type componentProps = {
    title: string,
}

export default class Navbar extends Component < componentProps > {
  render () {
    return <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <a className="navbar-brand" href="">PPM</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsDefault"
                    aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarsDefault">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Passwords</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#settings">Settings</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#info">Info</a>
                    </li>
                </ul>
            </div>
        </nav>
  }
}
