import predefinedPropTypes from '../../constants/prop-types/body'
import React from 'react'
import styled from 'styled-components'
import styles from '../../constants/css'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const P = styled.p`
  ${styles.paragraphText}
  ${styles.linkChildren}
`

export default function Paragraph({ data }) {
  const innerHtmlString = _.get(data, ['content', 0])
  return innerHtmlString ? (
    <P dangerouslySetInnerHTML={{ __html: innerHtmlString }} />
  ) : null
}

Paragraph.propTypes = {
  data: predefinedPropTypes.elementData,
}
