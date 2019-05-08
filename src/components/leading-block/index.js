import Img from '../shared/img-with-placeholder'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import predefinedPropTypes from '../shared/img-with-placeholder/prop-types'
import styled from 'styled-components'

const mockup = {
  desktop: {
    container: {
      paddingTop: 108, // px
    },
    title: {
      width: 437, // px
    },
  },
}

const BackgroundBlock = styled.div`
  /* through ThemeProvider of styled-components */
  background-color: ${props => props.theme.colors.primary.shape};

  width: 100%;
  height: 100vh;
  padding: ${props =>
      props.paddingTop || `${mockup.desktop.container.paddingTop}px`}
    10px 18px 10px;
`

const ContentBlock = styled.header`
  width: 100%;
  height: 100%;
  position: relative;
`

const TextBlock = styled.div`
  position: absolute;
  bottom: 0px;
  z-index: 1;
`

const TopicTextBlock = styled.div`
  background-color: ${props => props.theme.colors.primary.shape};
  border: solid 2px #fff;
  display: inline-block;

  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 30px;

  /* through ThemeProvider of styled-components */
  color: ${props => props.theme.colors.secondary.text};
  font-size: 18px;
  font-weight: bold;
  line-height: 2;
  letter-spacing: 0.4px;

  box-shadow: 5px 5px #fff;
`

const TitleTextBlock = styled.h1`
  /* through ThemeProvider of styled-components */
  color: ${props => props.theme.colors.secondary.text};

  width: ${mockup.desktop.title.width}px;

  font-size: 34px;
  font-weight: bold;
  padding-left: 10px;

  /* overwrite h1 default margin*/
  margin: 0;

  > span {
    line-height: 1.6;
    background-color: #fff;
    box-shadow: 10px 0 0 #fff, -10px 0 0 #fff;
  }
`

const SubtitleTextBlock = styled.h2`
  /* through ThemeProvider of styled-components */
  color: ${props => props.theme.colors.secondary.text};
  display: block;

  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;

  > span {
    line-height: 2.1;
    padding: 6px 12px;
    background-color: #fff;
  }
`

const FigureBlock = styled.figure`
  width: 100%;
  height: 100%;
  position: absolute;
  margin: 0;
`

export default class LeadingBlock extends PureComponent {
  static propTypes = {
    poster: PropTypes.shape({
      mobile: predefinedPropTypes.imagePropType.isRequired,
      tablet: predefinedPropTypes.imagePropType.isRequired,
      desktop: predefinedPropTypes.imagePropType.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    topicName: PropTypes.string,
    paddingTop: PropTypes.string,
  }

  static defaultProps = {
    subtitle: '',
    topicName: '',
    paddingTop: '',
  }

  render() {
    const { paddingTop, poster = {}, subtitle, title, topicName } = this.props

    return (
      <BackgroundBlock paddingTop={paddingTop}>
        <ContentBlock>
          <TextBlock>
            {topicName ? <TopicTextBlock>{topicName}</TopicTextBlock> : null}
            {subtitle ? (
              <SubtitleTextBlock>
                <span>{subtitle}</span>
              </SubtitleTextBlock>
            ) : null}
            <TitleTextBlock>
              <span>{title}</span>
            </TitleTextBlock>
          </TextBlock>
          <FigureBlock>
            <Img
              imageSet={[poster.mobile, poster.tablet, poster.desktop]}
              defaultImage={poster.mobile}
              objectFit="cover"
              objectPostion="center center"
              sizes="(max-width: 800px) 800px, (max-width: 1200px) 1200px, 2000px"
            />
          </FigureBlock>
        </ContentBlock>
      </BackgroundBlock>
    )
  }
}
