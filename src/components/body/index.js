import Blockquote from './blockquote'
import Annotation from './annotation'
import Brief from './brief'
import CenteredQuote from './centered-quote'
import Infobox from './infobox'
import Paragraph from './paragraph'
import predefinedPropTypes from '../../constants/prop-types'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
// lodash
import map from 'lodash/map'

const _ = {
  map,
}

function getElementComponent(type) {
  switch (type) {
    case 'annotation':
      return Annotation
    case 'audio':
      return null
    case 'centered-quote':
      return CenteredQuote
    case 'blockquote':
      return Blockquote
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
      return Infobox
    case 'ordered-list-item':
      return null
    case 'unordered-list-item':
      return null
    case 'unstyled':
      return Paragraph
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
    brief: PropTypes.arrayOf(predefinedPropTypes.elementData),
    content: PropTypes.arrayOf(predefinedPropTypes.elementData),
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
