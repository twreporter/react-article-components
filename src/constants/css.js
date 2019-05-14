import { css } from 'styled-components'
import typography from './typography'

const paragraphText = css`
  font-size: ${props => props.theme.fontSizeOffset + 18}px;
  font-weight: ${typography.font.weight.light};
  line-height: 2.11;
  letter-spacing: 0.6px;
  color: ${props => props.theme.colors.base.text};
`

const linkChildren = css`
  a:link,
  a:visited,
  a:active {
    color: ${props => props.theme.colors.primary.text};
  }
`

export default {
  paragraphText,
  linkChildren,
}
