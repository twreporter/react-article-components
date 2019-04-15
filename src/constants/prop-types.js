import PropTypes from 'prop-types'

const elementColors = PropTypes.shape({
  // leading block
  date: PropTypes.string,
  shape: PropTypes.string,
  subTitle: PropTypes.string,
  title: PropTypes.string,
  topicName: PropTypes.string,
  // body
  annotation: PropTypes.string,
  blockQuote: PropTypes.string,
  blockQuoteBy: PropTypes.string,
  caption: PropTypes.string,
  infoboxContent: PropTypes.string,
  infoboxTitle: PropTypes.string,
  line: PropTypes.string,
  link: PropTypes.string,
  metadataDefault: PropTypes.string,
  metadataPrimary: PropTypes.string,
  metadataSecodary: PropTypes.string,
  paragraph: PropTypes.string,
  quote: PropTypes.string,
  sectionSubtitle: PropTypes.string,
  sectionTitle: PropTypes.string,
})

const elementData = PropTypes.shape({
  alignment: PropTypes.oneOf(['center', 'left', 'right']).isRequired,
  styles: PropTypes.object.isRequired,
  content: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.object])
  ).isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'annotation',
    'audio',
    'blockquote',
    'quoteby',
    'header-one',
    'header-two',
    'code',
    'embeddedCode',
    'embeddedcode',
    'image',
    'imageDiff',
    'imagediff',
    'infobox',
    'ordered-list-item',
    'unordered-list-item',
    'unstyled',
    'slideshow',
    'youtube',
  ]).isRequired,
})

export default {
  elementColors,
  elementData,
}
