import predefinedPropTypes from '../../constants/prop-types'
import React, { PureComponent } from 'react'

export default class BlockQuote extends PureComponent {
  static propTypes = {
    data: predefinedPropTypes.elementData.isRequired,
  }

  render() {
    return <div />
  }
}
