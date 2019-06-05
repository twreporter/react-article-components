import { css } from 'styled-components'
import mq from '../utils/media-query'
import typography from './typography'

const paragraphText = css`
  font-size: ${props => props.theme.fontSizeOffset + 18}px;
  font-weight: ${typography.font.weight.normal};
  line-height: 2.11;
  letter-spacing: 0.6px;
  color: ${props => props.theme.colors.base.text};
`

const linkChildren = css`
  a:link,
  a:visited,
  a:active {
    color: ${props => props.theme.colors.primary.text};
    text-decoration: none;
    border-bottom: 1px solid #d8d8d8;
  }

  a:hover {
    border-color: ${props => props.theme.colors.primary.text};
  }
`

const bodyExtendWidth = css`
  ${mq.mobileOnly`
    width: 100%;
  `}
  ${mq.tabletOnly`
    width: 100%;
  `}
  ${mq.desktopOnly`
    width: 752px;
  `}
  ${mq.hdOnly`
    width: 1033px;
  `}
`

const bodyLargeWidth = css`
  ${mq.mobileOnly`
    // 355 = 375 - 20(body border width)
    width: calc(300/355*100%);
  `}
  ${mq.tabletOnly`
    width: 513px;
  `}
  ${mq.desktopOnly`
    width: 550px;
  `}
  ${mq.hdOnly`
    width: 730px;
  `}
`

const bodyNormalWidth = css`
  ${mq.mobileOnly`
    // 355 = 375 - 20(body border width)
    width: calc(300/355*100%);
  `}
  ${mq.tabletOnly`
    width: 453px;
  `}
  ${mq.desktopOnly`
    width: 480px;
  `}
  ${mq.hdOnly`
    width: 580px;
  `}
`

export default {
  body: {
    width: {
      normal: bodyNormalWidth,
      large: bodyLargeWidth,
      extend: bodyExtendWidth,
    },
  },
  paragraphText,
  linkChildren,
}
