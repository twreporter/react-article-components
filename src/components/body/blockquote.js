import mq from '../../utils/media-query'
import predefinedPropTypes from '../../constants/prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import typography from '../../constants/typography'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const Quote = styled.blockquote`
  line-height: 2.11;
  letter-spacing: 0.6px;
  color: ${props => props.theme.colors.base.lightText};
  font-size: 18px;
  font-weight: ${typography.font.weight.light};
  border-left: 2px solid ${props => props.theme.colors.base.line};
  margin: 40px auto;
  padding-left: 20px;
  ${mq.desktopOnly`
    width: 480px;
  `}
  ${mq.hdOnly`
    width: 580px;
  `}
`

export default class Blockquote extends PureComponent {
  static propTypes = {
    data: predefinedPropTypes.elementData.isRequired,
  }

  render() {
    const { data } = this.props
    const quote = _.get(data, ['content', 0])
    return quote ? <Quote dangerouslySetInnerHTML={{ __html: quote }} /> : null
  }
}
