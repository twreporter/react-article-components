import mq from '../../utils/media-query'
import predefinedPropTypes from '../../constants/prop-types'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import styles from '../../constants/css'
import typography from '../../constants/typography'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map,
}

const mockup = {
  width: {
    desktop: 529,
    hd: 718,
  },
}

const Container = styled.div`
  margin: 0 auto;
  ${mq.desktopOnly`
    width: ${mockup.width.desktop}px;
  `}
  ${mq.hdOnly`
    width: ${mockup.width.hd}px;
  `}
`

const Content = styled.div`
  p {
    color: ${props => props.theme.colors.base.text};
    line-height: 1.73;
    letter-spacing: 0.7px;
    font-weight: ${typography.font.weight.light};
    font-size: ${props => props.theme.fontSizeOffset + 22}px;
    margin: 0 0 1em 0;
    &:last-child {
      margin: 0;
    }
  }
  ${styles.linkChildren}
`

const Separation = styled.div`
  ${mq.desktopAndAbove`
    margin: 60px auto;
  `}
  ${mq.desktopOnly`
    width: 192px;
  `}
  ${mq.hdOnly`
    width: 270px;
  `}
  >svg>path {
    fill: ${props => props.theme.colors.primary.line};
  }
`

const curve = (
  <svg
    viewBox="0 0 270 11"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit="1.414"
  >
    <path
      d="M270,11c-6.285,0 -9.463,-2.629 -12.537,-5.172c-3.097,-2.562 -6.023,-4.982 -12.013,-4.982c-5.99,0 -8.915,2.42 -12.013,4.982c-3.074,2.543 -6.252,5.172 -12.537,5.172c-6.284,0 -9.462,-2.629 -12.535,-5.172c-3.097,-2.562 -6.022,-4.982 -12.011,-4.982c-5.99,0 -8.916,2.42 -12.012,4.983c-3.074,2.542 -6.252,5.171 -12.536,5.171c-6.284,0 -9.462,-2.629 -12.535,-5.172c-3.097,-2.562 -6.022,-4.982 -12.011,-4.982c-5.989,0 -8.915,2.42 -12.012,4.983c-3.073,2.542 -6.251,5.171 -12.534,5.171c-6.284,0 -9.461,-2.629 -12.534,-5.172c-3.097,-2.562 -6.021,-4.982 -12.01,-4.982c-5.988,0 -8.912,2.42 -12.008,4.982c-3.073,2.543 -6.251,5.172 -12.534,5.172c-6.283,0 -9.459,-2.629 -12.532,-5.172c-3.096,-2.562 -6.02,-4.982 -12.008,-4.982c-5.989,0 -8.914,2.42 -12.01,4.982c-3.073,2.543 -6.251,5.172 -12.535,5.172c-6.283,0 -9.46,-2.629 -12.533,-5.172c-3.097,-2.562 -6.022,-4.982 -12.01,-4.982l0,-0.846c6.283,0 9.461,2.629 12.534,5.172c3.096,2.562 6.021,4.982 12.009,4.982c5.989,0 8.914,-2.42 12.011,-4.982c3.073,-2.543 6.251,-5.172 12.534,-5.172c6.283,0 9.46,2.629 12.533,5.172c3.095,2.562 6.019,4.982 12.007,4.982c5.988,0 8.913,-2.42 12.009,-4.982c3.073,-2.543 6.25,-5.172 12.533,-5.172c6.283,0 9.461,2.629 12.534,5.172c3.096,2.562 6.022,4.982 12.01,4.982c5.989,0 8.913,-2.42 12.01,-4.982c3.073,-2.543 6.251,-5.172 12.536,-5.172c6.284,0 9.461,2.629 12.535,5.172c3.096,2.562 6.022,4.982 12.011,4.982c5.989,0 8.915,-2.42 12.012,-4.982c3.073,-2.543 6.251,-5.172 12.536,-5.172c6.284,0 9.462,2.629 12.535,5.172c3.097,2.562 6.022,4.982 12.011,4.982c5.99,0 8.916,-2.42 12.013,-4.982c3.074,-2.543 6.252,-5.172 12.537,-5.172c6.286,0 9.463,2.629 12.537,5.172c3.098,2.562 6.023,4.982 12.013,4.982l0,0.846Z"
      fill="#fabcf0"
    />
  </svg>
)

export default class Brief extends PureComponent {
  static propTypes = {
    data: PropTypes.arrayOf(predefinedPropTypes.elementData),
  }

  static defaultProps = {
    data: [],
  }

  _buildContentElement = (data, index) => {
    switch (data.type) {
      case 'unstyled':
        const htmlString = _.get(data, ['content', 0])
        if (!htmlString) return null
        return (
          <p
            key={_.get(data, 'id', `p-${index}`)}
            dangerouslySetInnerHTML={{ __html: htmlString }}
          />
        )
      default:
        return null
    }
  }

  render() {
    const { data } = this.props
    const elements = _.map(data, this._buildContentElement).filter(Boolean)
    return elements.length > 0 ? (
      <Container>
        <Content>{elements}</Content>
        <Separation>{curve}</Separation>
      </Container>
    ) : null
  }
}
