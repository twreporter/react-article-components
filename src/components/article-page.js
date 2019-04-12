import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Body from './body'
import LeadingBlock from './leading-block'
import get from 'lodash/get'

const _ = {
  get,
}

export default class Article extends PureComponent {
  static propTypes = {
    post: PropTypes.object.isRequired,
  }

  render() {
    const { post } = this.props
    return (
      <div>
        <LeadingBlock />
        <Body content={_.get(post, 'content.api_data')} />
      </div>
    )
  }
}
