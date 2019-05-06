import { getSrcsetString } from '../../../utils/image'
import PlaceholderIcon from './img-loading-placeholder.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const imagePropType = PropTypes.shape({
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
})

const objectFitConsts = {
  contain: 'contain',
  cover: 'cover',
}

const ImgContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  ${props => props.heightString}
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props => (props.toShow ? 'block' : 'none')};
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const ImgWithObjectFit = styled.img`
  display: block;
  height: 100%;
  object-fit: ${props => props.objectFit || 'none'};
  object-position: ${props => props.objectPosition || '50% 50%'};
  opacity: ${props => (props.toShowFallback ? '0' : '1')};
`

const FallbackObjectFitImg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: ${props => props.objectFit};
  background-repeat: no-repeat;
  background-position: ${props => props.objectPosition || '50% 50%'};
  background-image: url(${props => props.url});
`

const ImgBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${props => (props.toShow ? '1' : '0')};
  transition: opacity 0.5s;
  & > img {
    width: 100%;
  }
`

/**
 * An image element with placeholder.
 * The width and height of the image are required to preserve the space on the page for image.
 *
 * @class Image
 * @extends {React.PureComponent}
 */
export default class Img extends React.PureComponent {
  static propTypes = {
    alt: PropTypes.string,
    imgProps: PropTypes.object,
    // The properties of `imgProps` will all be passed to `<img />` element.
    imageSet: PropTypes.arrayOf(imagePropType),
    defaultImage: imagePropType,
    // The component will take the first item in `imageSet` as the default image.
    // The usage of default image:
    //   1. `img.src = defaultImage.url` for the browser not supporting `srcset`.
    //   2. The height/width ratio of the default image is used for this component. (no matter which candidate is acturally rendered)
    objectFit: PropTypes.oneOf([
      objectFitConsts.cover,
      objectFitConsts.contain,
    ]),
    objectPosition: PropTypes.string,
    sizes: PropTypes.string.isRequired,
  }

  static defaultProps = {
    alt: '',
    imgProps: {},
    imageSet: [],
    sizes: '',
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      toShowPlaceholder: true,
    }
    this._img = React.createRef()
    this.handleImageLoaded = this.handleImageLoaded.bind(this)
    this._isMounted = false
    this._supportObjectFit = true
  }

  componentDidMount() {
    // Check if browser support css object-fit.
    // Ref: https://github.com/anselmh/object-fit/blob/c6e275b099caf59ca44bfc5cbbaf4c388ace9980/src/polyfill.object-fit.core.js#L396
    this._supportObjectFit =
      'objectFit' in document.documentElement.style === true
    this._isMounted = true
    // If the browser has cached the image already, the `load` event of `<img>` will never be triggered.
    // Hence, we need to trigger `handleImageLoaded` manually.
    if (_.get(this._img.current, 'complete')) {
      this.handleImageLoaded()
    }
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleImageLoaded() {
    if (!this.state.isLoaded) {
      this.setState({
        isLoaded: true,
      })
      setTimeout(() => {
        if (this._isMounted) {
          this.setState({
            toShowPlaceholder: false,
          })
        }
      }, 1000)
    }
  }

  render() {
    const { toShowPlaceholder } = this.state
    const {
      alt,
      imgProps,
      imageSet,
      defaultImage,
      objectFit,
      objectPosition,
      sizes,
    } = this.props
    const srcset = getSrcsetString(imageSet)
    const heightWidthRatio =
      _.get(defaultImage, 'height') / _.get(defaultImage, 'width')
    if (!heightWidthRatio) {
      console.warn(
        'Valid height and width of the default image are required. But the default image is:',
        defaultImage
      )
    }
    const isObjectFit = Boolean(objectFit)
    return (
      <ImgContainer
        heightString={
          isObjectFit
            ? `height: 100%;`
            : `padding-top: ${heightWidthRatio * 100}%;`
        }
      >
        <Placeholder toShow={toShowPlaceholder}>
          <PlaceholderIcon />
        </Placeholder>
        <ImgBox toShow={!toShowPlaceholder}>
          {isObjectFit ? (
            <React.Fragment>
              <ImgWithObjectFit
                alt={alt}
                objectFit={objectFit}
                objectPosition={objectPosition}
                onLoad={this.handleImageLoaded}
                ref={this._img}
                sizes={this._supportObjectFit ? sizes : ''}
                src={_.get(defaultImage, 'url')}
                srcSet={this._supportObjectFit ? srcset : ''}
                hide={!this._supportObjectFit}
                {...imgProps}
              />
              {this._supportObjectFit ? null : (
                <FallbackObjectFitImg
                  url={_.get(defaultImage, 'url')}
                  objectFit={objectFit}
                  objectPosition={objectPosition}
                />
              )}
            </React.Fragment>
          ) : (
            <img
              alt={alt}
              onLoad={this.handleImageLoaded}
              ref={this._img}
              sizes={sizes}
              src={_.get(defaultImage, 'url')}
              srcSet={srcset}
              {...imgProps}
            />
          )}
        </ImgBox>
      </ImgContainer>
    )
  }
}
