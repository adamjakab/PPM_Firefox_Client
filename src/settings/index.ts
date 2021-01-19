/**
 * SETTINGS ENTRY POINT
 */
import * as _ from 'lodash'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ReactElement } from './components/react-element'

const z = { name: 'yeppa' }
const a = _.get(z, 'name')
console.log('Settings: ' + a)

const name = 'Jozsi'
ReactDOM.render(ReactElement({ name: name }), document.getElementById('app'))
