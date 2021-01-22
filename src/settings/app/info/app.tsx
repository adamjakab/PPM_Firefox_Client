import React, { Component } from 'react'

type componentProps = {
    title: string,
}

export default class Info extends Component < componentProps > {
  render () {
    return <main role="main" className="container-fluid">
            <div className="settings-main">
                <h1>{this.props.title}</h1>
                <p className="lead">Put some info here...</p>
            </div>
        </main>
  }
}
