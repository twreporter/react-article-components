import React, { PureComponent } from 'react'
// import PropTypes from 'prop-types'
import BlockQuote from './block-quote'
import InfoBox from './info-box'

export default class Body extends PureComponent {
  static propTypes = {}

  render() {
    return (
      <div>
        <BlockQuote />
        <InfoBox />
      </div>
    )
  }
}
