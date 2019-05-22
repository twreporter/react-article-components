import mq from '../utils/media-query'
import React, { PureComponent } from 'react'
import ReactGA from 'react-ga'
import styled from 'styled-components'
import typography from '../constants/typography'

const _donatePath = 'https://support.twreporter.org/'

const _content = {
  title: '用行動支持報導者',
  desc:
    '優質深度報導必須投入優秀記者、足夠時間與大量資源⋯⋯我們需要細水長流的小額贊助，才能走更長遠的路。 竭誠歡迎認同《報導者》理念的朋友贊助支持我們！',
  bt: '贊助我們',
}

const Container = styled.div`
  margin: 60px auto 40px auto;
  padding: 40px 30px 30px 30px;
  width: 502px;
  min-height: 284px;
  background: #fff;
  border-left: solid 1px ${props => props.theme.colors.secondary.support};
  ${mq.mobileOnly`
    margin: 40px auto;
    width: 320px;
    min-height: 335px;
  `}
`

const Title = styled.p`
  display: inline-block;
  background: ${props => props.theme.colors.secondary.background};
  padding-right: 2px;
  box-shadow: 5px 15px 0 #fff inset;
  font-size: 22px;
  font-weight: ${typography.font.weight.bold};
  color: ${props => props.theme.colors.base.text};
  margin-bottom: 15px;
  ${mq.mobileOnly`
    margin-bottom: 18px;
  `}
`

const Text = styled.p`
  font-size: 16px;
  line-height: 1.75;
  color: ${props => props.theme.colors.base.text};
`

const Donate = styled.div`
  width: 100%;
  height: 55px;
  margin-top: 50px;
  ${mq.mobileOnly`
    margin-top: 40px;
  `}
  a {
    width: 140px;
    height: 55px;
    background: #000;
    display: table;
    float: right;
    cursor: pointer;
    text-decoration: none;
    p {
      display: table-cell;
      text-align: center;
      vertical-align: middle;
      font-size: 14px;
      color: #fff;
      font-weight: 500;
      letter-spacing: 1.3px;
    }
    &:hover {
      background: ${props => props.theme.colors.secondary.accent};
    }
  }
`

export default class DonationBox extends PureComponent {
  render() {
    let currentHref = null
    let donateURL = null
    if (typeof window !== 'undefined') {
      currentHref = window.location.href
      const search = `utm_source=twreporter.org&utm_medium=article&utm_campaign=${encodeURIComponent(
        window.location.pathname
      )}`
      try {
        const url = new URL(_donatePath)
        url.search = search
        donateURL = url.toString()
      } catch (e) {
        donateURL = _donatePath + '?' + search
      }
    }
    return (
      <Container>
        <Title>{_content.title}</Title>
        <Text>{_content.desc}</Text>
        <Donate>
          <ReactGA.OutboundLink
            eventLabel={`[article_donation_button_click]: ${currentHref}`}
            to={donateURL || _donatePath}
            target="_blank"
          >
            <p>{_content.bt}</p>
          </ReactGA.OutboundLink>
        </Donate>
      </Container>
    )
  }
}
