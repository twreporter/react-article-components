import { ThemeProvider } from 'styled-components'
import Body from './body'
import get from 'lodash/get'
import LeadingBlock from './leading-block'
import Metadata from './metadata'
import predefinedPropTypes from '../constants/prop-types'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import merge from 'lodash/merge'

const _ = {
  get,
  merge,
}

const defaultColors = {
  primary: {
    text: '#55e07f',
    line: '#70f197',
    shape: '#73fa9c',
  },
  secondary: {
    text: '#7e33f6',
  },
  base: {
    text: '#494949',
    lightText: '#808080',
    line: '#d8d8d8',
    shape: '#f4f4f4',
  },
}

export default class Article extends PureComponent {
  static propTypes = {
    colors: predefinedPropTypes.colors,
    post: PropTypes.object.isRequired,
  }

  static defaultProps = {
    colors: {},
  }

  render() {
    const { colors, post } = this.props
    return (
      <ThemeProvider theme={{ colors: _.merge({}, defaultColors, colors) }}>
        <div>
          <LeadingBlock />
          <Body
            brief={_.get(post, 'brief.api_data')}
            content={_.get(post, 'content.api_data')}
          />
          <Metadata
            categories={post.categories}
            designers={post.designers}
            photographers={post.photographers}
            tags={post.tags}
            writers={post.writters}
            engineers={post.engineers}
            rawAutherText={post.extend_byline}
          />
        </div>
      </ThemeProvider>
    )
  }
}
