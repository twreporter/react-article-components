import Aside from './aside'
import Metadata from './aside/metadata'
import Tools from './aside/tools'
import Body from './body'
import DynamicComponentsContext from '../contexts/dynamic-components-context'
import LeadingBlock from './leading-block'
import Link from './shared/link'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Related from './related'
import get from 'lodash/get'
import map from 'lodash/map'
import merge from 'lodash/merge'
import mq from '../utils/media-query'
import predefinedPropTypes from '../constants/prop-types'
import sortBy from 'lodash/sortBy'
import styled, { ThemeProvider } from 'styled-components'

const _ = {
  get,
  map,
  merge,
  sortBy,
}

const mockup = {
  desktop: {
    column: {
      width: 188, // px
      paddingRight: 4, // px
    },
  },
  hd: {
    column: {
      width: 267, // px
      paddingRight: 6, // px
    },
  },
}

const defaultColors = {
  primary: {
    text: '#ef7ede',
    line: '#fbafef',
    shape: '#fabcf0',
  },
  secondary: {
    text: '#355ed3',
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

const HorizontalCentered = styled.div`
  margin: 0 auto;
`

const BodyBackground = styled.div`
  width: 100%;
  background-color: #fff;
`

const BodyBlock = styled(HorizontalCentered)`

  ${mq.tabletAndBelow`
    display: block;
    width: 100%;
  `}

  ${mq.desktopOnly`
    display: flex;
    width: ${props => props.columns * mockup.desktop.column.width}px;
    padding-top: 60px;
  `}

  ${mq.hdOnly`
    display: flex;
    width: ${props => props.columns * mockup.hd.column.width}px;
    padding-top: 55px;
  `}
`

const AsideBlock = styled.div`

  ${mq.tabletAndBelow`
    display: none;
  `}

  ${mq.tabletOnly`
    flex: 1 1 ${props => props.columns * mockup.desktop.column.width}px;
    padding-right: ${mockup.desktop.column.paddingRight}px;
  `}

  ${mq.hdOnly`
    flex: 0 1 ${props => props.columns * mockup.hd.column.width}px;
    padding-right: ${mockup.hd.column.paddingRight}px;
  `}
`

const MetadataAndToolsBlock = styled.div`
  ${mq.mobileOnly`
    padding-top: 30px;
    padding-bottom: 30px;
  `}

  ${mq.tabletOnly`
    padding-top: 60px;
    padding-bottom: 60px;
  `}

  ${mq.desktopAndAbove`
    display: none;
  `}
`

const ToolsBlock = styled.div`
  ${mq.mobileOnly`
    margin-top: 20px;
  `}

  ${mq.tabletOnly`
    margin-top: 30px;
  `}
`

const ContentBlock = styled.div`
  ${mq.tabletAndBelow`
    width: 100%;
  `}

  ${mq.desktopOnly`
    flex: 1 1 ${props => props.columns * mockup.desktop.column.width}px;
  `}

  ${mq.hdOnly`
    flex: 0 1 ${props => props.columns * mockup.hd.column.width}px;
  `}
`

const BlockSizing = styled.div`
  ${mq.tabletAndBelow`
    width: 100%;
  `}

  ${mq.desktopOnly`
    width: ${props => props.columns * mockup.desktop.column.width}px;
  `}

  ${mq.hdOnly`
    width: ${props => props.columns * mockup.hd.column.width}px;
  `}
`

const RelatedBlock = styled(BlockSizing)`
  margin: 80px auto 0 auto;
`

function getColumns(type) {
  switch (type) {
    case 'small-image':
    case 'image-link':
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

const _articleStyles = {
  interactive: 'interactive',
}

export default class Article extends PureComponent {
  static propTypes = {
    colors: predefinedPropTypes.elementColors,
    post: PropTypes.object.isRequired,
    defaultFontLevel: PropTypes.oneOf([
      _fontLevel.base,
      _fontLevel.large,
      _fontLevel.xLarge,
    ]),
    LinkComponent: PropTypes.func,
  }

  static defaultProps = {
    colors: {},
    defaultFontLevel: _fontLevel.base,
    LinkComponent: Link,
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
    const { LinkComponent, colors, post } = this.props
    const { fontLevel } = this.state
    const relateds = _.map(_.get(post, 'relateds', []), related => {
      const style = _.get(related, 'style')
      const prefixPath = style === _articleStyles.interactive ? '/i/' : '/a/'
      const categories = related.categories
      // sort categories in ascending order
      _.sortBy(categories, ['sort_order'])

      const imageSet = _.get(related, 'og_image.resized_targets', {})

      return {
        category: _.get(categories, '0.name', ''),
        date: related.published_date,
        desc: related.og_description,
        href: prefixPath + related.slug,
        id: related.id,
        isTargetBlank: style === _articleStyles.interactive,
        thumbnail: _.get(imageSet, 'w400.url')
          ? imageSet.w400
          : imageSet.mobile,
        title: related.title,
      }
    })

    return (
      <ThemeProvider
        theme={{
          colors: _.merge({}, defaultColors, colors),
          fontSizeOffset: this.getFontSizeOffet(fontLevel),
        }}
      >
        <DynamicComponentsContext.Provider value={{ Link: LinkComponent }}>
          <BackgroundBlock>
            <LeadingBlock
              title={post.title}
              subtitle={post.subtitle}
              topicName={_.get(post, 'topics.topic_name', '')}
              poster={{
                mobile: _.get(post, 'hero_image.resized_targets.mobile', {}),
                tablet: _.get(post, 'hero_image.resized_targets.tablet', {}),
                desktop: _.get(post, 'hero_image.resized_targets.desktop', {}),
              }}
            />
            <BodyBackground>
              <BodyBlock columns={5}>
                <AsideBlock columns={1}>
                  <Aside
                    categories={post.categories}
                    date={post.published_date}
                    designers={post.designers}
                    photographers={post.photographers}
                    tags={post.tags}
                    writers={post.writters}
                    engineers={post.engineers}
                    rawAutherText={post.extend_byline}
                    onFontLevelChange={this.changeFontLevel}
                  />
                </AsideBlock>
                <MetadataAndToolsBlock>
                  <Metadata
                    categories={post.categories}
                    date={post.published_date}
                    designers={post.designers}
                    photographers={post.photographers}
                    tags={post.tags}
                    writers={post.writters}
                    engineers={post.engineers}
                    rawAutherText={post.extend_byline}
                  />
                  <ToolsBlock>
                    <Tools onFontLevelChange={this.changeFontLevel} />
                  </ToolsBlock>
                </MetadataAndToolsBlock>
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
                <MetadataAndToolsBlock>
                  <Metadata
                    categories={post.categories}
                    date={post.published_date}
                    designers={post.designers}
                    photographers={post.photographers}
                    tags={post.tags}
                    writers={post.writters}
                    engineers={post.engineers}
                    rawAutherText={post.extend_byline}
                  />
                  <ToolsBlock>
                    <Tools onFontLevelChange={this.changeFontLevel} />
                  </ToolsBlock>
                </MetadataAndToolsBlock>
              </BodyBlock>
              <RelatedBlock columns={5}>
                <Related data={relateds} />
              </RelatedBlock>
            </BodyBackground>
          </BackgroundBlock>
        </DynamicComponentsContext.Provider>
      </ThemeProvider>
    )
  }
}
