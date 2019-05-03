import mq from '../../utils/media-query'
import predefinedPropTypes from '../../constants/prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import styles from '../../constants/css'
import typography from '../../constants/typography'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const Container = styled.div`
  margin: 40px auto 80px auto;
`

const QuoteContent = styled.blockquote`
  margin: 0 auto;
  ${mq.desktopOnly`
    width: 550px;
  `}
  ${mq.hdOnly`
    width: 730px;
  `}
  font-weight: ${typography.font.weight.light};
  font-size: ${props => props.theme.fontSizeOffset + 32}px;
  line-height: 1.56;
  letter-spacing: 1.1px;
  text-align: center;
  color: ${props => props.theme.colors.base.text};
`

const QuoteBy = styled.cite`
  margin: 25px auto 0 auto;
  ${mq.desktopOnly`
    width: 366px;
  `}
  ${mq.hdOnly`
    width: 486px;
  `}
  display: block;
  font-style: normal;
  font-weight: ${typography.font.weight.light};
  font-size: ${props => props.theme.fontSizeOffset + 16}px;
  line-height: 1.56;
  letter-spacing: 0.5px;
  text-align: center;
  color: ${props => props.theme.colors.base.text};
  ${styles.linkChildren}
`

const VerticalLine = styled.div`
  width: 2px;
  height: 80px;
  background: ${props => props.theme.colors.primary.line};
  margin: 0 auto 40px auto;
`

export default class CenteredQuote extends PureComponent {
  static propTypes = {
    data: predefinedPropTypes.elementData.isRequired,
  }

  render() {
    const { data } = this.props
    const content = _.get(data, ['content', 0, 'quote'])
    const by = _.get(data, ['content', 0, 'by'])
    return content ? (
      <Container>
        <VerticalLine />
        <QuoteContent dangerouslySetInnerHTML={{ __html: content }} />
        {by ? <QuoteBy dangerouslySetInnerHTML={{ __html: by }} /> : null}
      </Container>
    ) : null
  }
}
