import PropTypes from 'prop-types'
import predefinedPropTypes from '../shared/img-with-placeholder/prop-types'

const card = PropTypes.shape({
  category: PropTypes.string,
  date: PropTypes.string,
  desc: PropTypes.string,
  href: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isTargetBlank: PropTypes.bool,
  thumbnail: predefinedPropTypes.imagePropType,
  title: PropTypes.string.isRequired,
})

export default {
  card,
}
