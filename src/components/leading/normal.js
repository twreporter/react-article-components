import DynamicComponentsContext from '../../contexts/dynamic-components-context'
import Img from '../img-with-placeholder'
import React from 'react'
import mq from '../../utils/media-query'
import get from 'lodash/get'
import predefinedPropTypes from '../../constants/prop-types/leading'
import styled, { css } from 'styled-components'

const _ = {
  get,
}

const BackgroundBlock = styled.div`
  background-color: #f1f1f1;
  padding-top: 60px;
`

const ContentBlock = styled.div`
  letter-spacing: 0.4px;

  ${mq.mobileOnly`
    line-height: 1.43;
  `}

  ${mq.tabletAndAbove`
    position: relative;
    /* 20px is border-(right|left) width of body */
    width: calc(100% + 20px);
    left: -10px;
    padding-bottom: 60px;
    border-bottom: solid 1px #e2e2e2;
  `}
`

const TextBlock = styled.div`
  margin: 0 auto;

  ${mq.mobileOnly`
    width: calc(327/375*100%);
  `}

  ${mq.tabletOnly`
    width: calc(513/768*100%);
  `}

  ${mq.desktopAndAbove`
    width: 718px;
  `}
`

const Title = styled.h1`
  color: ${props => props.theme.colors.base.text};
  letter-spacing: 0.4px;
  font-weight: bold;

  ${mq.mobileOnly`
    font-size: 34px;
    margin-top: 30px;
    margin-bottom: 40px;
  `}

  ${mq.tabletAndAbove`
    font-size: 42px;
    line-height: 1.38;
    margin-top: 30px;
    margin-bottom: 60px;
  `}
`

const Subtitle = styled.h2`
  color: ${props => props.theme.colors.base.text};
  font-weight: bold;

  ${mq.tabletAndBelow`
    margin-top: 20px;
    margin-bottom: 30px;
  `}

  ${mq.mobileOnly`
    font-size: 16px;
  `}

  ${mq.tabletAndAbove`
    line-height: 2.1;
    font-size: 20px;
  `}

`

const Topic = styled.div`
  font-size: 14px;
  display: inline-block;
  color: ${props => props.theme.colors.primary.text};
  border-width: 1px;
  border-style: solid;
  border-color: ${props => props.theme.colors.primary.support};
  padding: 10px;
`

const Figure = styled.figure`
  /* clear default figure margin */
  margin: 0;
  ${props => props.css}
`

const FigCaption = styled.figcaption`
  color: ${props => props.theme.colors.base.lightText};

  ${mq.tabletAndBelow`
    font-size: 14px;
    margin-top: 15px;
  `}

  ${mq.mobileOnly`
    margin-left: calc(6/375*100%);
    margin-right: calc(6/375*100%);
  `}

  ${mq.tabletAndAbove`
    margin-left: calc(15/768*100%);
    margin-right: calc(15/768*100%);
  `}

  ${mq.hdOnly`
    margin-top: 20px;
  `}

`

export default class NormalLeading extends React.PureComponent {
  static propTypes = predefinedPropTypes.default
  static defaultProps = {
    figureCaption: 'test',
    subtitle: '',
    topicHref: '',
    topicName: '',
  }

  constructor(props) {
    super(props)

    this.figureWidth = {
      tablet: 567,
      desktop: 778,
      hd: 1080,
    }
  }

  getFigureCSS() {
    return css`
      ${mq.mobileOnly`
        position: relative;
        left: -10px;
        /* 20px is border-(right|left) width of body */
        width: calc(100% + 20px);
      `}
      ${mq.tabletAndAbove`
        margin: 0 auto;
      `}
      ${mq.tabletOnly`
        width: calc(${this.figureWidth.tablet}/768*100%);
      `}
      ${mq.desktopOnly`
        width: ${this.figureWidth.desktop}px;
      `}
      ${mq.hdOnly`
        width: ${this.figureWidth.hd}px;
      `}
    `
  }

  render() {
    const {
      figureCaption = 'test',
      poster = {},
      subtitle,
      title,
      topicHref,
      topicName,
    } = this.props

    return (
      <BackgroundBlock>
        <ContentBlock>
          <TextBlock>
            {topicName ? (
              <DynamicComponentsContext.Consumer>
                {components => {
                  return (
                    <components.Link to={topicHref}>
                      <Topic>{topicName}</Topic>
                    </components.Link>
                  )
                }}
              </DynamicComponentsContext.Consumer>
            ) : null}
            <Subtitle>{subtitle}</Subtitle>
            <Title>{title}</Title>
          </TextBlock>
          <Figure css={this.getFigureCSS()}>
            <Img
              imgPlaceholderSrc={_.get(poster, 'tiny.url', '')}
              imageSet={[poster.mobile, poster.tablet, poster.desktop]}
              defaultImage={poster.mobile}
              sizes="(max-width: 800px) 800px, (max-width: 1200px) 1200px, 2000px"
            />
            {figureCaption ? <FigCaption>{figureCaption}</FigCaption> : null}
          </Figure>
        </ContentBlock>
      </BackgroundBlock>
    )
  }
}
