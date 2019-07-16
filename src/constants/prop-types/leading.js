import PropTypes from 'prop-types'
import predefinedPropTypes from './img-with-placeholder'

const leading = {
  poster: PropTypes.shape({
    tiny: predefinedPropTypes.imagePropType.isRequired,
    mobile: predefinedPropTypes.imagePropType.isRequired,
    tablet: predefinedPropTypes.imagePropType.isRequired,
    desktop: predefinedPropTypes.imagePropType.isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  topicName: PropTypes.string,
  topicHref: PropTypes.string,
}

export default {
  pink: {
    ...leading,
    paddingTop: PropTypes.string,
  },
  default: {
    ...leading,
    figureCaption: PropTypes.string,
  },
  fullscreen: {
    ...leading,
    portraitPoster: PropTypes.shape({
      tiny: predefinedPropTypes.imagePropType.isRequired,
      mobile: predefinedPropTypes.imagePropType.isRequired,
    }),
  },
}
