import PropTypes from 'prop-types'

const authorPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
})

export default {
  metadata: {
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        sort_order: PropTypes.number.isRequired,
      })
    ),
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    writers: PropTypes.arrayOf(authorPropType),
    photographers: PropTypes.arrayOf(authorPropType),
    designers: PropTypes.arrayOf(authorPropType),
    engineers: PropTypes.arrayOf(authorPropType),
    rawAutherText: PropTypes.string,
    date: PropTypes.string,
  },
  tools: {
    fbAppID: PropTypes.string,
    height: PropTypes.string,
    onFontLevelChange: PropTypes.func,
  },
}
