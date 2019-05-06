import Img from '../shared/img-with-placeholder'
import mq from '../../utils/media-query'
import predefinedPropTypes from '../../constants/prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import typography from '../../constants/typography'

const _ = {
  get,
}

const imgProps = {
  itemProp: 'contentUrl',
}

const mockup = {
  captionWidth: {
    desktop: 180,
    hd: 265,
  },
  containerWidth: {
    small: {
      desktop: 403,
      hd: 532,
    },
  },
}

const Container = styled.div`
  position: relative;
  ${mq.desktopOnly`
    width: ${props =>
      props.small ? `${mockup.containerWidth.small.desktop}px` : '100%'};
    margin: ${props => (props.small ? '0 0 20px 25px' : '60px auto')};
  `}
  ${mq.hdOnly`
    width: ${props =>
      props.small ? `${mockup.containerWidth.small.hd}px` : '100%'};
    margin: ${props => (props.small ? '0 0 30px 30px' : '60px auto')};
  `}
  float: right;
  & > figure {
    padding: 0;
    border: 0;
    margin: 0;
  }
`

const Caption = styled.figcaption`
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
  ${mq.desktopOnly`
    width: ${mockup.captionWidth.desktop}px;
  `}
  ${mq.hdOnly`
    width: ${mockup.captionWidth.hd}px;
  `}
`

export default class Image extends PureComponent {
  static propTypes = {
    data: predefinedPropTypes.elementData.isRequired,
  }

  render() {
    const { data } = this.props
    const image = _.get(data, ['content', 0])
    const caption = _.get(image, 'description')
    const alt = _.get(image, 'keywords', caption)
    return (
      <Container small={_.get(data, 'type') === 'small-image'}>
        <figure itemScope itemType="http://schema.org/ImageObject">
          <Img
            alt={alt}
            imgProps={imgProps}
            imageSet={[image.mobile, image.tablet, image.desktop, image.tiny]}
            defaultImage={image.mobile}
            objectFit="cover"
            /* TODO: add sizes */
          />
          {caption ? <Caption itemprop="description">{caption}</Caption> : null}
        </figure>
      </Container>
    )
  }
}
