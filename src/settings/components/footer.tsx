import React, { Component } from 'react'

type componentProps = {
    title: string,
    version: string
}

export class FooterSection extends Component < componentProps > {
  render () {
    return <footer className="footer">
        <div className="container-fluid">
            <span className="text-muted">{this.props.title} {this.props.version}</span>
        </div>
    </footer>
  }
}
