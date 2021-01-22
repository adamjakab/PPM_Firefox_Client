import React from 'react'
import ReactDOM from 'react-dom'
import singleSpaReact from 'single-spa-react'
import Info from './app'

function domElementGetter () {
  return document.getElementById('content') as any
}

const reactLifecycles = singleSpaReact({
  React,
  ReactDOM,
  rootComponent: (Info as any),
  domElementGetter
})

export const bootstrap = [
  reactLifecycles.bootstrap
]

export const mount = [
  reactLifecycles.mount
]

export const unmount = [
  reactLifecycles.unmount
]
