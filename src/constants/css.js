import { css } from 'styled-components'
import typography from './typography'

const paragraphText = css`
  font-size: 18px;
  font-weight: ${typography.font.weight.light};
  line-height: 2.11;
  letter-spacing: 0.6px;
  color: ${props => props.theme.elementColors.paragraph};
`

const linkChildren = css`
  a:link,
  a:visited,
  a:active {
    color: ${props => props.theme.elementColors.link};
  }
`

export default {
  paragraphText,
  linkChildren,
}
