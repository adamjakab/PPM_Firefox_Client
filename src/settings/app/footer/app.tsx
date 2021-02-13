import React, { Component } from 'react'

type componentProps = {
    title: string,
    version: string,
}

export default class Footer extends Component < componentProps > {
  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error(error)
  }

  render () {
    return <footer className="footer">
        <div className="container-fluid">
            <span className="text-muted">{this.props.title} {this.props.version}</span>
        </div>
    </footer>
  }
}