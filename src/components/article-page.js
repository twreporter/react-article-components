import { ThemeProvider } from 'styled-components'
import Body from './body'
import get from 'lodash/get'
import LeadingBlock from './leading-block'
import predefinedPropTypes from '../constants/prop-types'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const _ = {
  get,
}

export default class Article extends Component {
  static propTypes = {
    elementColors: predefinedPropTypes.elementColors.isRequired,
    post: PropTypes.object.isRequired,
  }

  render() {
    const { elementColors, post } = this.props
    return (
      <ThemeProvider theme={{ elementColors }}>
        <div>
          <LeadingBlock />
          <Body
            brief={_.get(post, 'brief.api_data')}
            content={_.get(post, 'content.api_data')}
          />
        </div>
      </ThemeProvider>
    )
  }
}
