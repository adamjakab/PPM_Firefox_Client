import React, { Component } from 'react'

type componentProps = {
    title: string,
}

export class FooterSection extends Component < componentProps > {
  render () {
    return <footer className="footer">
        Footer
    </footer>
  }
}
