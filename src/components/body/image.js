import Img from '../img-with-placeholder'
import Multimedia from './multimedia'
import predefinedPropTypes from '../../constants/prop-types/body'
import React, { PureComponent } from 'react'
import get from 'lodash/get'

const _ = {
  get,
}

const imgProps = {
  itemProp: 'contentUrl',
}

const Container = Multimedia.Block
const Caption = Multimedia.Caption

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
            /* TODO: add sizes */
          />
          {caption ? <Caption itemprop="description">{caption}</Caption> : null}
        </figure>
      </Container>
    )
  }
}
