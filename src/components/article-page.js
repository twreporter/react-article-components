import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import Body from './body'
import LeadingBlock from './leading-block'

export default class Article extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <div>
        <LeadingBlock />
        <Body />
      </div>
    )
  }
}
