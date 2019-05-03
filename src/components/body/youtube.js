import React from 'react'
import mq from '../../utils/media-query'
import predefinedPropTypes from '../../constants/prop-types'
import styled from 'styled-components'
import typography from '../../constants/typography'
import get from 'lodash/get'

const _ = {
  get,
}

const mockup = {
  captionWidth: {
    desktop: 180,
    hd: 265,
  },
}

const youtube = {
  width: 734,
  height: 417,
}

const Block = styled.div`
  width: 100%;
  padding-bottom: ${(youtube.height / youtube.width) * 100}%;
  position: relative;
  float: right;
  margin-bottom: 60px;
`

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Desc = styled.p`
  position: absolute;
  right: 0;
  bottom: 0;
  transform: translateY(100%);
  border-bottom: 2px solid ${props => props.theme.colors.primary.line};
  color: ${props => props.theme.colors.base.text};
  line-height: 1.36;
  letter-spacing: 0.5px;
  font-weight: ${typography.font.weight.light};
  font-size: 14px;
  padding: 15px 0;
  margin: 0;
  ${mq.desktopOnly`
    width: ${mockup.captionWidth.desktop}px;
  `}
  ${mq.hdOnly`
    width: ${mockup.captionWidth.hd}px;
  `}
`

export default class Youtube extends React.PureComponent {
  static propTypes = {
    data: predefinedPropTypes.elementData.isRequired,
  }

  render() {
    const { data } = this.props
    const id = _.get(data, 'content.0.youtubeId')
    const desc = _.get(data, 'content.0.description')
    return (
      <Block>
        <Iframe
          frameBorder="0"
          allowFullScreen={true}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          src={`https://www.youtube.com/embed/${id}`}
        />
        <Desc>{desc}</Desc>
      </Block>
    )
  }
}
