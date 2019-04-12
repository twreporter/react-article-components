import BlockQuote from './block-quote'
import Brief from './brief'
import InfoBox from './info-box'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
// import predefinedPropTypes from '../../constants/prop-types'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

function getElementComponent(type) {
  switch (type) {
    case 'annotation':
      return null
    case 'audio':
      return null
    case 'blockquote':
      return BlockQuote
    case 'quoteby':
      return null
    case 'header-one':
      return null
    case 'header-two':
      return null
    case 'code':
      return null
    case 'embeddedCode':
    case 'embeddedcode':
      return null
    case 'image':
      return null
    case 'imageDiff':
    case 'imagediff':
      return null
    case 'infobox':
      return InfoBox
    case 'ordered-list-item':
      return null
    case 'unordered-list-item':
      return null
    case 'unstyled':
      return null
    case 'slideshow':
      return null
    case 'youtube':
      return null
    default:
      return null
  }
}

export default class Body extends PureComponent {
  static propTypes = {
    brief: PropTypes.arrayOf(PropTypes.object),
    content: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    brief: [],
    content: [],
  }

  _buildContentElement = data => {
    const Component = getElementComponent(data.type)
    if (!Component) return null
    return <Component key={data.id} data={data} />
  }

  render() {
    const { brief, content } = this.props
    const contentJsx = Array.isArray(content)
      ? _.map(content, this._buildContentElement)
      : null
    return (
      <div>
        <Brief data={brief} />
        {contentJsx}
      </div>
    )
  }
}
