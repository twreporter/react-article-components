import PropTypes from 'prop-types'

const imagePropType = PropTypes.shape({
  url: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
})

export default {
  imagePropType,
}
