import mq from '../../utils/media-query'
import styled from 'styled-components'
import typography from '../../constants/typography'

const mockup = {
  desktop: {
    multimedia: {
      width: {
        normal: 100, // %
        small: 403, // px
      },
      caption: {
        width: 180, // px
      },
      margin: {
        normal: '60px auto',
        small: '0 0 20px 25px',
      },
    },
  },
  hd: {
    multimedia: {
      width: {
        normal: 100, // %
        small: 532, // px
      },
      caption: {
        width: 265, // px
      },
      margin: {
        normal: '60px auto',
        small: '0 0 20px 25px',
      },
    },
  },
}

export default {
  Multimedia: {
    Block: styled.div`
      position: relative;
      ${mq.desktopOnly`
        width: ${props =>
          props.small
            ? `${mockup.desktop.multimedia.width.small}px`
            : `${mockup.desktop.multimedia.width.normal}%`};
        margin: ${props =>
          props.small
            ? mockup.desktop.multimedia.margin.small
            : mockup.desktop.multimedia.margin.normal};
      `}
      ${mq.hdOnly`
        width: ${props =>
          props.small
            ? `${mockup.hd.multimedia.width.small}px`
            : `${mockup.hd.multimedia.width.normal}%`};
        margin: ${props =>
          props.small
            ? mockup.hd.multimedia.margin.small
            : mockup.hd.multimedia.margin.normal};
      `}
      float: ${props => (props.small ? 'right' : 'none')};
      & > figure, & > iframe {
        padding: 0;
        border: 0;
        margin: 0;
      }
    `,
    Caption: styled.figcaption`
      position: absolute;
      right: 0;
      bottom: 0;
      transform: translateY(100%);
      border-bottom: 2px solid ${props => props.theme.colors.primary.line};
      color: ${props => props.theme.colors.base.text};
      line-height: 1.36;
      letter-spacing: 0.5px;
      font-weight: ${typography.font.weight.light};
      font-size: 14px;
      padding: 15px 0;
      ${mq.desktopOnly`
        width: ${mockup.desktop.multimedia.caption.width}px;
      `}
      ${mq.hdOnly`
        width: ${mockup.hd.multimedia.caption.width}px;
      `}
    `,
  },
}
