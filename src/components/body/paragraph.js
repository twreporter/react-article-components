import mq from '../../utils/media-query'
import predefinedPropTypes from '../../constants/prop-types'
import React from 'react'
import styled from 'styled-components'
import typography from '../../constants/typography'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const P = styled.p`
  ${mq.desktopOnly`
    width: 480px;
  `}
  ${mq.hdOnly`
    width: 580px;
  `}
  font-size: 18px;
  font-weight: ${typography.font.weight.light};
  line-height: 2.11;
  letter-spacing: 0.6px;
  color: ${props => props.theme.elementColors.paragraph};
  a:link,
  a:visited,
  a:active {
    color: ${props => props.theme.elementColors.link};
  }
  margin: 2.62em auto 2.62em auto;
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
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
