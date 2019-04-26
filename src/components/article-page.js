import Aside from './aside'
import Body from './body'
import LeadingBlock from './leading-block'
import predefinedPropTypes from '../constants/prop-types'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import get from 'lodash/get'
import merge from 'lodash/merge'
import styled, { ThemeProvider } from 'styled-components'

const _ = {
  get,
  merge,
}

const mockup = {
  desktop: {
    column: {
      width: 188, // px
      paddingRight: 4, // px
    },
  },
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

const BorderBox = styled.div`
  * {
    box-sizing: border-box;
  }
`

const BackgroundBlock = styled(BorderBox)`
  /* pass from ThemeProvider */
  background-color: ${props => props.theme.colors.primary.shape};

  padding-left: 10px;
  padding-right: 10px;
`

const HeaderBlock = styled.div``

const HorizontalCentered = styled.div`
  margin: 0 auto;
`

const BodyBackground = styled.div`
  width: 100%;
  background-color: #fff;
`

const BodyBlock = styled(HorizontalCentered)`
  display: flex;
  width: ${props => props.columns * mockup.desktop.column.width}px;
`

const AsideBlock = styled.div`
  flex: 1 1 ${props => props.columns * mockup.desktop.column.width}px;
  padding-right: ${mockup.desktop.column.paddingRight}px;
`

const ContentBlock = styled.div`
  flex: 1 1 ${props => props.columns * mockup.desktop.column.width}px;
`

const BlockSizing = styled.div`
  width: ${props => props.columns * mockup.desktop.column.width}px;
`

function getColumns(type) {
  switch (type) {
    case 'image':
    case 'imageDiff':
    case 'imagediff':
    case 'slideshow':
    case 'youtube':
      return 4
    default:
      return 3
  }
}

const _fontLevel = {
  base: 'base',
  large: 'large',
  xLarge: 'xLarge',
}

export default class Article extends PureComponent {
  static propTypes = {
    colors: predefinedPropTypes.colors,
    post: PropTypes.object.isRequired,
    defaultFontLevel: PropTypes.oneOf([
      _fontLevel.base,
      _fontLevel.large,
      _fontLevel.xLarge,
    ]),
  }

  static defaultProps = {
    colors: {},
    defaultFontLevel: _fontLevel.base,
  }

  constructor(props) {
    super(props)

    this.state = {
      fontLevel: props.defaultFontLevel,
    }
  }

  changeFontLevel = () => {
    const { fontLevel } = this.state
    let nextFontLevel = ''
    switch (fontLevel) {
      case _fontLevel.large: {
        nextFontLevel = _fontLevel.xLarge
        break
      }
      case _fontLevel.xLarge: {
        nextFontLevel = _fontLevel.base
        break
      }
      case _fontLevel.base:
      default: {
        nextFontLevel = _fontLevel.large
        break
      }
    }

    this.setState({
      fontLevel: nextFontLevel,
    })
  }

  getFontSizeOffet(fontLevel) {
    switch (fontLevel) {
      case _fontLevel.large: {
        return 2
      }
      case _fontLevel.xLarge: {
        return 4
      }
      case _fontLevel.base:
      default: {
        return 0
      }
    }
  }

  render() {
    const { colors, post } = this.props
    const { fontLevel } = this.state

    return (
      <ThemeProvider
        theme={{
          colors: _.merge({}, defaultColors, colors),
          fontSizeOffset: this.getFontSizeOffet(fontLevel),
        }}
      >
        <BackgroundBlock>
          <HeaderBlock>
            <LeadingBlock />
          </HeaderBlock>
          <BodyBackground>
            <BodyBlock columns={5}>
              <AsideBlock columns={1}>
                <Aside
                  categories={post.categories}
                  designers={post.designers}
                  photographers={post.photographers}
                  tags={post.tags}
                  writers={post.writters}
                  engineers={post.engineers}
                  rawAutherText={post.extend_byline}
                  onFontLevelChange={this.changeFontLevel}
                />
              </AsideBlock>
              <ContentBlock columns={4}>
                <Body
                  brief={_.get(post, 'brief.api_data')}
                  content={_.get(post, 'content.api_data')}
                  renderBrief={(Brief, data) => {
                    return (
                      <BlockSizing columns={3}>
                        <Brief data={data} />
                      </BlockSizing>
                    )
                  }}
                  renderElement={(Element, data) => {
                    const columns = getColumns(_.get(data, 'type'))
                    return (
                      <BlockSizing columns={columns} key={data.id}>
                        <Element data={data} />
                      </BlockSizing>
                    )
                  }}
                />
              </ContentBlock>
            </BodyBlock>
          </BodyBackground>
        </BackgroundBlock>
      </ThemeProvider>
    )
  }
}
