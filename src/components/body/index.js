import Annotation from './annotation'
import Blockquote from './blockquote'
import Brief from './brief'
import CenteredQuote from './centered-quote'
import Embedded from './embedded-code'
import Headings from './headings'
import Image from './image'
import Infobox from './infobox'
import list from './list'
import map from 'lodash/map'
import Paragraph from './paragraph'
import predefinedPropTypes from '../../constants/prop-types/body'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Slideshow from './slideshow'
import styled from 'styled-components'
import cssConst from '../../constants/css'
import Youtube from './youtube'

const _ = {
  map,
}

const _blockWidth = {
  normal: 'normal',
  large: 'large',
  extend: 'extend',
}

const BlockSizing = styled.div`
  margin: ${props => {
    if (props.margin) {
      return props.margin
    }
    return props.blockWidth === _blockWidth.normal ? '40px auto' : '60px auto'
  }};
  ${props => cssConst.body.width[props.blockWidth]}
`

const BriefBlock = styled(BlockSizing)`
  margin: 0 auto;
`

function renderElement(data = {}) {
  switch (data.type) {
    case 'annotation':
      return (
        <BlockSizing blockWidth={_blockWidth.normal}>
          <Annotation data={data} />
        </BlockSizing>
      )
    case 'audio':
      return null
    case 'centered-quote':
      return (
        <BlockSizing blockWidth={_blockWidth.large}>
          <CenteredQuote data={data} />
        </BlockSizing>
      )
    case 'blockquote':
      return (
        <BlockSizing blockWidth={_blockWidth.normal}>
          <Blockquote data={data} />
        </BlockSizing>
      )
    case 'quoteby':
      return null
    case 'header-one':
      return (
        <BlockSizing
          blockWidth={_blockWidth.normal}
          margin="60px auto 40px auto"
        >
          <Headings.H1 data={data} />
        </BlockSizing>
      )
    case 'header-two':
      return (
        <BlockSizing
          blockWidth={_blockWidth.normal}
          margin="60px auto 40px auto"
        >
          <Headings.H2 data={data} />
        </BlockSizing>
      )
    case 'code':
      return null
    case 'embedded-code':
    case 'embeddedCode':
    case 'embeddedcode':
      return (
        <BlockSizing
          blockWidth={_blockWidth.large}
          style={{ overflow: 'hidden' }}
        >
          <Embedded data={data} />
        </BlockSizing>
      )
    case 'small-image':
    case 'image':
    case 'image-link':
      /*
        The `image-link` in keystone editor is using `embedded-code` component actually currently.
        If we add a `image-link` type in the future, we just have to make the data format of `image-link` and `image` the same.
      */
      return (
        <BlockSizing blockWidth={_blockWidth.extend}>
          <Image data={data} />
        </BlockSizing>
      )
    case 'imageDiff':
    case 'imagediff':
      return null
    case 'infobox':
      return (
        <BlockSizing blockWidth={_blockWidth.large}>
          <Infobox data={data} />
        </BlockSizing>
      )
    case 'ordered-list-item':
      return (
        <BlockSizing blockWidth={_blockWidth.normal}>
          <list.OrderedList data={data} />
        </BlockSizing>
      )
    case 'unordered-list-item':
      return (
        <BlockSizing blockWidth={_blockWidth.normal}>
          <list.UnorderedList data={data} />
        </BlockSizing>
      )
    case 'unstyled':
      return (
        <BlockSizing blockWidth={_blockWidth.normal}>
          <Paragraph data={data} />
        </BlockSizing>
      )
    case 'slideshow':
      return (
        <BlockSizing blockWidth={_blockWidth.extend}>
          <Slideshow data={data} />
        </BlockSizing>
      )
    case 'youtube':
      return (
        <BlockSizing blockWidth={_blockWidth.extend}>
          <Youtube data={data} />
        </BlockSizing>
      )
    default:
      return null
  }
}

export default class Body extends PureComponent {
  static propTypes = {
    brief: PropTypes.arrayOf(predefinedPropTypes.elementData),
    content: PropTypes.arrayOf(predefinedPropTypes.elementData),
  }

  static defaultProps = {
    brief: [],
    content: [],
  }

  _buildContentElement = (data, index) => {
    return (
      <div key={data.id || `body_element_${index}`}>{renderElement(data)}</div>
    )
  }

  render() {
    const { brief, content } = this.props
    const contentJsx = Array.isArray(content)
      ? _.map(content, this._buildContentElement)
      : null
    return (
      <div>
        <BriefBlock blockWidth={_blockWidth.normal}>
          <Brief data={brief} />
        </BriefBlock>
        {contentJsx}
      </div>
    )
  }
}
