/**
 * SETTINGS ENTRY POINT
 */
import * as _ from 'lodash'
import * as ReactDOM from 'react-dom'
import { NavigationSection } from './components/navigation'
import { ContentSection } from './components/content'
import { FooterSection } from './components/footer'

const navProps = {
  title: 'Paranoia Password Manager'
}
const navSection = new NavigationSection(navProps)
const navSectionElement = navSection.render()

const contentProps = {
  title: 'Paranoia Password Manager'
}
const contentSection = new ContentSection(contentProps)
const contentSectionElement = contentSection.render()

const footerProps = {
  title: 'Paranoia Password Manager',
  version: 'v0.0.1'
}
const footerSection = new FooterSection(footerProps)
const footerSectionElement = footerSection.render()

document.addEventListener('DOMContentLoaded', function () {
  ReactDOM.render(navSectionElement, document.getElementById('navigation'))
  ReactDOM.render(contentSectionElement, document.getElementById('content'))
  ReactDOM.render(footerSectionElement, document.getElementById('footer'))
})
