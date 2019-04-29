import NextArrowSvg from './next-arrow.svg'
import PreArrowSvg from './pre-arrow.svg'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import get from 'lodash/get'
import map from 'lodash/map'
import mq from '../../utils/media-query'
import styled from 'styled-components'

const _ = {
  get,
  map,
}

const mockup = {
  desktop: {
    container: {
      width: 752, // px
    },
    slide: {
      width: 691, // px
      height: 429, // px
      paddingRight: 4, // px
    },
    offset: {
      left: 33, // px
    },
  },
  hd: {
    container: {
      width: 1063, // px
    },
    slide: {
      width: 966, // px
      height: 603, // px
      paddingRight: 5, // px
    },
    offset: {
      left: 44, // px
    },
  },
}

// Assuming there are three images [ A, B, C ] for slideshow.
// If image B is rendered in the center,
// users can see part of image A(left side) and image C(right side) with masks.
// When users click right button to see image C, which means, C is in the center,
// users still can see part of image B(left side) and image A(right side) with masks.
//
// Hence, there are four images rendered arround B at the beginning.
// The image array should be [ C, A, B, C, A ].
//
// `slidesOffset` indicates how many slides rendered before/after image B, which is, 2 (A and C).
//
const slidesOffset = 2

// duration of transition of transform(translateX(?px))
const duration = 300

// current index to indicate which image should be rendered in the center
const defaultCurIndex = 0

const SlideshowFlexBox = styled.div`
  max-width: ${mockup.desktop.container.width}px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  ${mq.hdOnly`
    max-width: ${mockup.hd.container.width}px;
  `}

  * {
    box-sizing: border-box;
  }
`

const SlidesSection = styled.div`
  flex-shrink: 0;
  flex-basis: 100%;
  overflow: hidden;
  position: relative;
  padding-bottom: ${(mockup.desktop.slide.height /
    mockup.desktop.container.width) *
    100}%;

  ${mq.hdOnly`
    padding-bottom: ${(mockup.hd.slide.height / mockup.hd.container.width) *
      100}%;
  `}
`

const PrevNextSection = styled.div`
  margin-top: 20px;
`

const PrevButton = styled.div`
  cursor: pointer;
  width: 59px;
  height: 59px;
  display: inline-flex;
  border: solid 1px #d8d8d8;

  > svg {
    margin: auto;
    width: 21px;
  }

  ${mq.hdOnly`
    width: 83px;
    height: 83px;

    > svg {
      width: 31px;
    }
  `}
`

const NextButton = styled(PrevButton)`
  border-left: none;
`

const DescriptionSection = styled.div`
  margin-top: 6px;
`

const ImageNumberCircle = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  background-color: ${props => props.theme.colors.primary.shape};
  border-radius: 50%;
  vertical-align: top;

  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 62px;
    border-top: solid 1px #fff;
    transform: rotate(-45deg);
    transform-origin: bottom left;
    top: 67px;
    left: 7px;
  }

  ${mq.hdOnly`
    margin-right: -18px;
    width: 110px;
    height: 110px;

    &::after {
      width: 89px;
      top: 93px;
      left: 10px;
    }
  `}
`

const ImageNumber = styled.span`
  color: #fff;
  position: absolute;
  top: 25px;
  left: 9px;
  font-size: 24px;
  font-family: BioRhyme;
  font-weight: bold;
  line-height: 0.79;

  ${mq.hdOnly`
    top: 35px;
    left: 10px;
  `}
`

const ImageTotal = styled(ImageNumber)`
  top: 46px;
  left: 36px;

  ${mq.hdOnly`
    top: 71px;
    left: 50px;
  `}
`

const Desc = styled.p`
  position: relative;
  display: inline-block;
  width: 180px;
  color: #494949;

  border-bottom: solid 1px ${props => props.theme.colors.primary.line};
  margin-top: 26px;
  padding-bottom: 15px;

  font-size: 14px;
  font-weight: 300;
  line-height: 1.36;
  letter-spacing: 0.5px;
`

const SlidesFlexBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  height: 100%;
  ${props => {
    if (props.isSliding) {
      return `transition: transform ${props.duration}ms ease-in-out;`
    }
  }}
  transform: translateX(${props =>
    getTranslateX(mockup.desktop, props.translateXUint)}px);

  ${mq.hdOnly`
    transform: translateX(${props =>
      getTranslateX(mockup.hd, props.translateXUint)}px);
  `}
`

const SlideFlexItem = styled.div`
  flex-shrink: 0;
  flex-basis: ${getSlideWidth(mockup.desktop)}px;
  padding-right: ${mockup.desktop.slide.paddingRight}px;

  ${mq.hdOnly`
    flex-basis: ${getSlideWidth(mockup.hd)}px;
    padding-right: ${mockup.hd.slide.paddingRight}px;
  `}
`

const SlideMask = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  opacity: 0.55;
  background: #2440fb;
`

const LeftSlideMask = styled(SlideMask)`
  left: 0;
  width: ${getLeftMaskWidth(mockup.desktop)}px;

  ${mq.hdOnly`
    width: ${getLeftMaskWidth(mockup.hd)}px;
  `}
`

const RightSlideMask = styled(SlideMask)`
  right: 0;
  width: ${getRightMaskWidth(mockup.desktop)}px;

  ${mq.hdOnly`
    width: ${getRightMaskWidth(mockup.hd)}px;
  `}
`

/**
 * @typedef {Object} SlideMockup
 * @property {number} width
 * @property {number} height
 * @property {number} paddingRight
 */

/**
 * @typedef {Object} ContainerMockup
 * @property {number} width
 */

/**
 * @typedef {Object} OffsetMockup
 * @property {number} left
 */

/**
 * @typedef {Object} DeviceMockup
 * @property {SlideMockup} slide
 * @property {ContainerMockup} container
 * @property {OffsetMockup} offset
 */

/**
 * @param {DeviceMockup} deviceMockup
 * @param {number} unit
 * @return {number}
 */
function getTranslateX(deviceMockup, unit) {
  const slideWidth = deviceMockup.slide.width

  // total slides width including padding
  let translateX = unit * slideWidth

  // add left mask width and padding
  translateX = translateX + deviceMockup.offset.left
  return translateX // px
}

/**
 * @param {DeviceMockup} deviceMockup
 * @return {number}
 */
function getSlideWidth(deviceMockup) {
  return deviceMockup.slide.width
}

/**
 * @param {DeviceMockup} deviceMockup
 * @return {number}
 */
function getLeftMaskWidth(deviceMockup) {
  return deviceMockup.offset.left - deviceMockup.slide.paddingRight // px
}

/**
 * @param {DeviceMockup} deviceMockup
 * @return {number}
 */
function getRightMaskWidth(deviceMockup) {
  return (
    deviceMockup.container.width -
    deviceMockup.offset.left -
    deviceMockup.slide.width
  ) // px
}

const imageProp = PropTypes.shape({
  url: PropTypes.string.isRequired,
})

const contentProp = PropTypes.arrayOf(
  PropTypes.shape({
    description: PropTypes.string,
    desktop: imageProp.isRequired,
    mobile: imageProp.isRequired,
    tablet: imageProp.isRequired,
  })
)

export default class Slideshow extends PureComponent {
  static propTypes = {
    data: PropTypes.shape({
      content: contentProp.isRequired,
    }),
  }

  static defaultProps = {
    data: {
      content: [],
    },
  }

  constructor(props) {
    super(props)
    const images = _.get(props, 'data.content', [])
    this.total = images.length

    // For slicing images array easily later,
    // add last `slidesOffset` elements into top of images array.
    // add first `slidesOffset` elements into bottom of images array.
    // EX:
    // slidesOffset: 2
    // input images: [ a, b, c, d ]
    // output images: [c, d, a, b, c, d, a, b]
    this.images = [].concat(
      images.slice(-slidesOffset),
      images,
      images.slice(defaultCurIndex, slidesOffset)
    )

    this.defaultTranslateXUnit = -slidesOffset

    this.state = {
      // value of curSlideIndex would be in [ 0 ~ props.data.content.length ] range,
      // it indicates which image should be placed in the center
      curSlideIndex: defaultCurIndex,
      isSliding: false,
      translateXUint: this.defaultTranslateXUnit,
    }

    this.slideToPrev = this._slideToPrev.bind(this)
    this.slideToNext = this._slideToNext.bind(this)
  }

  _slideToPrev() {
    this.setState(
      {
        isSliding: true,
        translateXUint: this.state.translateXUint + 1,
      },
      () => {
        let curSlideIndex = this.state.curSlideIndex - 1

        if (curSlideIndex < defaultCurIndex) {
          curSlideIndex = this.total + curSlideIndex
        }

        setTimeout(() => {
          this.setState({
            isSliding: false,
            curSlideIndex: curSlideIndex,
            translateXUint: this.defaultTranslateXUnit,
          })
        }, duration * 2)
      }
    )
  }

  _slideToNext() {
    this.setState(
      {
        isSliding: true,
        translateXUint: this.state.translateXUint - 1,
      },
      () => {
        let curSlideIndex = this.state.curSlideIndex + 1

        if (curSlideIndex >= this.total) {
          curSlideIndex = curSlideIndex % this.total
        }

        setTimeout(() => {
          this.setState({
            isSliding: false,
            curSlideIndex: curSlideIndex,
            translateXUint: this.defaultTranslateXUnit,
          })
        }, duration * 2)
      }
    )
  }

  render() {
    const { curSlideIndex, isSliding, translateXUint } = this.state

    const slides = this.images.slice(
      curSlideIndex,
      curSlideIndex + slidesOffset * 2 + 1
    )

    const slidesJSX = _.map(slides, (slide, index) => {
      return (
        <SlideFlexItem key={`slide_${slide.id}_${index}`}>
          {/* TODO use ImgWrapper */}
          <img
            src={slide.tablet.url}
            width="100%"
            height="100%"
            style={{
              objectFit:
                slide.tablet.width > slide.tablet.height ? 'cover' : 'contain',
            }}
          />
        </SlideFlexItem>
      )
    })

    return (
      <SlideshowFlexBox>
        <SlidesSection>
          <SlidesFlexBox
            translateXUint={translateXUint}
            duration={duration}
            isSliding={isSliding}
          >
            {slidesJSX}
          </SlidesFlexBox>
          <LeftSlideMask />
          <RightSlideMask />
        </SlidesSection>
        <PrevNextSection>
          <PrevButton onClick={isSliding ? undefined : this.slideToPrev}>
            <PreArrowSvg />
          </PrevButton>
          <NextButton onClick={isSliding ? undefined : this.slideToNext}>
            <NextArrowSvg />
          </NextButton>
        </PrevNextSection>
        <DescriptionSection>
          <ImageNumberCircle>
            <ImageNumber>{curSlideIndex + 1}</ImageNumber>
            <ImageTotal>{this.total}</ImageTotal>
          </ImageNumberCircle>
          <Desc>{_.get(slides, [curSlideIndex, 'description'])}</Desc>
        </DescriptionSection>
      </SlideshowFlexBox>
    )
  }
}
