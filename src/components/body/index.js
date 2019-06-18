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
import mq from '../../utils/media-query'
import Paragraph from './paragraph'
import predefinedPropTypes from '../../constants/prop-types/body'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import Slideshow from './slideshow'
import styled, { css } from 'styled-components'
import Youtube from './youtube'

const _ = {
  map,
}

const mockup = {
  margin: {
    extend: '60px auto',
    large: '60px auto',
    normal: '40px auto',
    headerOne: '60px auto 40px auto',
    headerTwo: '60px auto 40px auto',
    aligned: '0',
  },
}

const extendWidthCSS = css`
  ${mq.mobileOnly`
    width: 100%;
  `}
  ${mq.tabletOnly`
    width: 100%;
  `}
  ${mq.desktopOnly`
    width: 752px;
  `}
  ${mq.hdOnly`
    width: 1033px;
  `}
`

const largeWidthCSS = css`
  ${mq.mobileOnly`
    // 355 = 375 - 20(body border width)
    width: calc(300/355*100%);
  `}
  ${mq.tabletOnly`
    width: 513px;
  `}
  ${mq.desktopOnly`
    width: 550px;
  `}
  ${mq.hdOnly`
    width: 730px;
  `}
`

const normalWidthCSS = css`
  ${mq.mobileOnly`
    // 355 = 375 - 20(body border width)
    width: calc(300/355*100%);
  `}
  ${mq.tabletOnly`
    width: 453px;
  `}
  ${mq.desktopOnly`
    width: 480px;
  `}
  ${mq.hdOnly`
    width: 580px;
  `}
`

const BlockSizing = styled.div`
  ${props => props.widthCSS};
`

const BriefBlock = styled(BlockSizing)`
  margin: 0 auto;
`

const AlignRight = styled.div`
  /* props.widthCSS is for mobile and tablet width */
  ${props => props.widthCSS};

  ${mq.tabletAndBelow`
    margin: 0 auto;
  `}

  ${mq.desktopAndAbove`
    float: right;
    margin: 0 0 50px 25px;
  `}

  ${mq.desktopOnly`
    width: 403px;
  `}

  ${mq.hdOnly`
    width: 532px;
  `}
`

function renderElement(data = {}) {
  const isCenterAligned = data.alignment === 'center'
  let blockSizingWidthCSS = normalWidthCSS
  let style = {
    margin: mockup.margin.normal,
  }
  let elementJSX = null

  switch (data.type) {
    case 'annotation':
      elementJSX = <Annotation data={data} />
      break
    case 'audio':
      return null
    case 'centered-quote':
    case 'quoteby':
      blockSizingWidthCSS = isCenterAligned ? largeWidthCSS : extendWidthCSS
      style = {
        margin: isCenterAligned ? mockup.margin.large : mockup.margin.aligned,
      }
      elementJSX = isCenterAligned ? (
        <CenteredQuote data={data} />
      ) : (
        <AlignRight widthCSS={largeWidthCSS}>
          <CenteredQuote data={data} />
        </AlignRight>
      )
      break
    case 'blockquote':
      blockSizingWidthCSS = isCenterAligned ? normalWidthCSS : extendWidthCSS
      style = {
        margin: isCenterAligned ? mockup.margin.normal : mockup.margin.aligned,
      }
      elementJSX = isCenterAligned ? (
        <Blockquote data={data} />
      ) : (
        <AlignRight widthCSS={normalWidthCSS}>
          <Blockquote data={data} />
        </AlignRight>
      )
      break
    case 'header-one':
      style = {
        margin: mockup.margin.headerOne,
      }
      elementJSX = <Headings.H1 data={data} />
      break
    case 'header-two':
      style = {
        margin: mockup.margin.headerTwo,
      }
      elementJSX = <Headings.H2 data={data} />
      break
    case 'code':
      return null
    case 'embedded-code':
    case 'embeddedCode':
    case 'embeddedcode':
      blockSizingWidthCSS = isCenterAligned ? largeWidthCSS : extendWidthCSS
      style = {
        margin: isCenterAligned ? mockup.margin.large : mockup.margin.aligned,
      }
      elementJSX = isCenterAligned ? (
        <Embedded data={data} />
      ) : (
        <AlignRight widthCSS={largeWidthCSS}>
          <Embedded data={data} />
        </AlignRight>
      )
      break
    case 'small-image':
    case 'image':
    case 'image-link':
      /*
        The `image-link` in keystone editor is using `embedded-code` component actually currently.
        If we add a `image-link` type in the future, we just have to make the data format of `image-link` and `image` the same.
      */
      blockSizingWidthCSS = extendWidthCSS
      style = {
        margin: mockup.margin.extend,
      }
      // image alignment is handled by body/multimedia.js
      // we just pass `small` prop into `Image` component
      elementJSX = <Image data={data} small={!isCenterAligned} />
      break
    case 'imageDiff':
    case 'imagediff':
      return null
    case 'infobox':
      blockSizingWidthCSS = isCenterAligned ? largeWidthCSS : extendWidthCSS
      style = {
        margin: isCenterAligned ? mockup.margin.large : mockup.margin.aligned,
      }
      elementJSX = isCenterAligned ? (
        <Infobox data={data} />
      ) : (
        <AlignRight widthCSS={largeWidthCSS}>
          <Infobox data={data} />
        </AlignRight>
      )
      break
    case 'ordered-list-item':
      elementJSX = <list.OrderedList data={data} />
      break
    case 'unordered-list-item':
      elementJSX = <list.UnorderedList data={data} />
      break
    case 'unstyled':
      elementJSX = <Paragraph data={data} />
      break
    case 'slideshow':
      blockSizingWidthCSS = extendWidthCSS
      // Not support slideshow alignment so far
      elementJSX = <Slideshow data={data} />
      break
    case 'youtube':
      blockSizingWidthCSS = extendWidthCSS
      // Not support youtube alignment so far
      elementJSX = <Youtube data={data} />
      break
    default:
      elementJSX = <Paragraph data={data} />
      break
  }

  return (
    <BlockSizing key={data.id} widthCSS={blockSizingWidthCSS} style={style}>
      {elementJSX}
    </BlockSizing>
  )
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
    if (!data.id) {
      data.id = `body_element_${index}`
    }
    return renderElement(data)
  }

  render() {
    const { brief, content } = this.props
    const contentJsx = Array.isArray(content)
      ? _.map(content, this._buildContentElement)
      : null
    return (
      <div>
        <BriefBlock widthCSS={normalWidthCSS}>
          <Brief data={brief} />
        </BriefBlock>
        {contentJsx}
      </div>
    )
  }
}
