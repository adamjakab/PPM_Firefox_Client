import React, { Component } from 'react'

type componentProps = {
    title: string,
}

export default class Passwords extends Component < componentProps > {
  render () {
    return <main role="main" className="container-fluid">
            <div className="settings-main">
                <h1>{this.props.title}</h1>
                <p className="lead">some passwords please...</p>
            </div>
        </main>
  }
}
