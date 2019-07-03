import DynamicComponentsContext from '../contexts/dynamic-components-context'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import mq from '../utils/media-query'
import predefinedPropTypes from '../constants/prop-types/article-page'
import styled, { ThemeProvider } from 'styled-components'
// components
import Body from './body'
import DesktopAside from './aside/desktop-aside'
import DonationBox from './donation-box'
import LeadingBlock from './leading-block'
import License from './license'
import Link from './link'
import Metadata from './aside/metadata'
import MobileAside from './aside/mobile-aside'
import Related from './related'
import SeparationCurve from './separation-curve'
import Tools from './aside/tools'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import merge from 'lodash/merge'
import sortBy from 'lodash/sortBy'
import throttle from 'lodash/throttle'

const _ = {
  get,
  map,
  merge,
  sortBy,
  throttle,
}

const defaultColors = {
  primary: {
    text: '#355ed3',
    accent: '#ef7ede',
    support: '#fbafef',
    background: '#fadaf5',
  },
  secondary: {
    text: '#a67a44',
    accent: '#a67a44',
    support: '#d0a67d',
    background: '#c9af8e',
  },
  base: {
    text: '#404040',
    lightText: '#808080',
    button: '#808080',
    line: '#afafaf',
    background: '#fff',
  },
}

const BorderBox = styled.div`
  * {
    box-sizing: border-box;
  }
`

const BackgroundBlock = styled(BorderBox)`
  /* pass from ThemeProvider */
  background-color: ${props => props.theme.colors.primary.background};

  padding-left: 10px;
  padding-right: 10px;
`

const BodyBackground = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  ${mq.desktopOnly`
    padding-top: 60px;
  `}

  ${mq.hdOnly`
    padding-top: 55px;
  `}
`

const BodyBlock = styled.div`
  position: relative;
  width: 100%;

  ${mq.desktopOnly`
    max-width: 1024px;
    margin: 0 auto;
  `}

  ${mq.hdOnly`
    max-width: 1440px;
    margin: 0 auto;
  `}
`

const DesktopAsideBlock = styled.div`
  ${mq.tabletAndBelow`
    display: none;
  `}

  ${mq.desktopAndAbove`
    position: absolute;
    height: 100%;
  `}

  ${mq.desktopOnly`
    width: 180px;
    left: 28px;
  `}

  ${mq.hdOnly`
    width: 250px;
    left: 53px;
  `}
`

const MetadataAndToolsBlock = styled.div`
  ${mq.mobileOnly`
    padding-top: 40px;
    padding-bottom: 60px;
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
  margin: 0 auto;

  ${mq.tabletAndBelow`
    width: 100%;
  `}
  ${mq.desktopOnly`
    width: 550px;
  `}
  ${mq.hdOnly`
    width: 730px;
  `}
`

const RelatedBlock = styled(BodyBlock)`
  margin: 80px auto 0 auto;
`

const _fontLevel = {
  base: 'base',
  large: 'large',
  xLarge: 'xLarge',
}

const _articleStyles = {
  interactive: 'interactive',
}

function getTopicHref(topicObj = {}) {
  const slug = _.get(topicObj, 'slug')
  if (slug) {
    return `/topics/${slug}`
  }
  return null
}

export default class Article extends PureComponent {
  static propTypes = {
    colors: predefinedPropTypes.elementColors,
    post: PropTypes.object.isRequired,
    relatedTopic: PropTypes.object,
    relatedPosts: PropTypes.array,
    defaultFontLevel: PropTypes.oneOf([
      _fontLevel.base,
      _fontLevel.large,
      _fontLevel.xLarge,
    ]),
    LinkComponent: PropTypes.func,
  }

  static defaultProps = {
    LinkComponent: Link,
    colors: {},
    defaultFontLevel: _fontLevel.base,
    relatedPosts: [],
    relatedTopic: {},
  }

  constructor(props) {
    super(props)

    this.state = {
      fontLevel: props.defaultFontLevel,
    }

    this.mobileAsideRef = React.createRef()
    this.scrollPosition = {
      y: 0,
    }
    this.toggleMobileAside = this._toggleMobileAside.bind(this)
    this.onScroll = _.throttle(this.toggleMobileAside, 300).bind(this)
  }

  componentDidMount() {
    // detect sroll position
    window.addEventListener('scroll', this.onScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)

    this.scrollPosition = {
      y: 0,
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

  /**
   * If users scroll up, and the scrolling distance is more than a certain distance as well, show mobile aside.
   * Otherwise, if users scroll down, hide the mobile aside.
   */
  _toggleMobileAside() {
    if (this.mobileAsideRef) {
      const mAside = this.mobileAsideRef
      const currentTopY = window.scrollY

      // Calculate scrolling distance to determine whether to display aside
      const lastY = this.scrollPosition.y
      const distance = currentTopY - lastY
      if (distance > 30) {
        this.scrollPosition.y = currentTopY
        mAside.current.toShow = false
      } else {
        if (Math.abs(distance) > 150) {
          this.scrollPosition.y = currentTopY
          mAside.current.toShow = true
        }
      }
    }
  }

  render() {
    const {
      LinkComponent,
      colors,
      post,
      relatedPosts,
      relatedTopic,
    } = this.props
    const { fontLevel } = this.state
    const relateds = _.map(relatedPosts, related => {
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

    const articleMetaForBookmark = {
      slug: _.get(post, 'slug', ''),
      title: _.get(post, 'title', ''),
      desc: _.get(post, 'og_description', ''),
      thumbnail:
        _.get(post, 'hero_image.resized_targets.mobile.url') ||
        _.get(post, 'og_image.resized_targets.mobile.url', ''),
      is_external: _.get(post, 'is_external', false),
      published_date: _.get(post, 'published_date', ''),
      topicSlug: _.get(relatedTopic, 'slug', ''),
      topicTitle: _.get(relatedTopic, 'title', ''),
    }

    const topicHref = getTopicHref(relatedTopic)

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
              topicHref={topicHref}
              topicName={_.get(relatedTopic, 'topic_name', '')}
              poster={{
                tiny: _.get(post, 'hero_image.resized_targets.tiny', {}),
                mobile: _.get(post, 'hero_image.resized_targets.mobile', {}),
                tablet: _.get(post, 'hero_image.resized_targets.tablet', {}),
                desktop: _.get(post, 'hero_image.resized_targets.desktop', {}),
              }}
            />
            <BodyBackground>
              <BodyBlock>
                <MobileAside
                  backToTopic={topicHref}
                  ref={this.mobileAsideRef}
                />
                <DesktopAsideBlock>
                  <DesktopAside
                    backToTopic={topicHref}
                    categories={post.categories}
                    date={post.published_date}
                    designers={post.designers}
                    photographers={post.photographers}
                    tags={post.tags}
                    writers={post.writters}
                    engineers={post.engineers}
                    rawAutherText={post.extend_byline}
                    onFontLevelChange={this.changeFontLevel}
                    articleMetaForBookmark={articleMetaForBookmark}
                  />
                </DesktopAsideBlock>
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
                    <Tools
                      backToTopic={topicHref}
                      onFontLevelChange={this.changeFontLevel}
                      articleMetaForBookmark={articleMetaForBookmark}
                    />
                  </ToolsBlock>
                </MetadataAndToolsBlock>
                <ContentBlock>
                  <Body
                    brief={_.get(post, 'brief.api_data')}
                    content={_.get(post, 'content.api_data')}
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
                    <Tools
                      backToTopic={topicHref}
                      onFontLevelChange={this.changeFontLevel}
                      articleMetaForBookmark={articleMetaForBookmark}
                    />
                  </ToolsBlock>
                </MetadataAndToolsBlock>
              </BodyBlock>
              <DonationBox />
              <License
                license={post.copyright}
                publishedDate={post.published_date}
              />
              <SeparationCurve />
              <RelatedBlock>
                <Related data={relateds} />
              </RelatedBlock>
            </BodyBackground>
          </BackgroundBlock>
        </DynamicComponentsContext.Provider>
      </ThemeProvider>
    )
  }
}
