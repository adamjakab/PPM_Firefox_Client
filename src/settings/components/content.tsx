import React, { Component } from 'react'

type componentProps = {
    title: string,
}

export class ContentSection extends Component < componentProps > {
  render () {
    return <main role="main" className="container-fluid">
        <div className="settings-main">
            <h1>{this.props.title}</h1>
            <p className="lead">Put some config here...</p>
        </div>
    </main>
  }
}
