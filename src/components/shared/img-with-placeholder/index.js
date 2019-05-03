import { getSrcsetString } from '../../../utils/image'
import get from 'lodash/get'
import PlaceholderIcon from './img-loading-placeholder.svg'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const _ = {
  get,
}

const ImgContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-bottom: ${props => `${props.heightWidthRatio * 100}%`};
`

const Placeholder = styled.div`
  width: 100%;
  height: 100%;
  position absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${props => (props.toShow ? 'block' : 'none')};
  svg {
    position absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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
    imageSet: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
      })
    ),
    // The component will take the first item in `imageSet` as the default image.
    // The usage of default image:
    //   1. `img.src = defaultImage.url` for the browser not supporting `srcset`.
    //   2. The height/width ratio of the default image is used for this component. (no matter which candidate is acturally rendered)
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
  }

  componentDidMount() {
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
    const { alt, imgProps, imageSet, sizes } = this.props
    const defaultImage = imageSet[0]
    const srcset = getSrcsetString(imageSet)
    const heightWidthRatio =
      _.get(defaultImage, 'height') / _.get(defaultImage, 'width')
    if (!heightWidthRatio) {
      console.error(
        'Valid height and width of the default image are required. But the default image is:',
        defaultImage
      )
    }
    return (
      <ImgContainer heightWidthRatio={heightWidthRatio}>
        <Placeholder toShow={toShowPlaceholder}>
          <PlaceholderIcon />
        </Placeholder>
        <ImgBox toShow={!toShowPlaceholder}>
          <img
            alt={alt}
            sizes={sizes}
            onLoad={this.handleImageLoaded}
            src={_.get(defaultImage, 'url')}
            srcSet={srcset}
            ref={this._img}
            {...imgProps}
          />
        </ImgBox>
      </ImgContainer>
    )
  }
}
