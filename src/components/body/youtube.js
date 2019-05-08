import React from 'react'
import predefinedPropTypes from '../../constants/prop-types'
import predefinedStyled from './styled'
import styled from 'styled-components'
import get from 'lodash/get'

const _ = {
  get,
}

const Block = styled(predefinedStyled.Multimedia.Block)`
  padding-bottom: 56.25%;
`

const Iframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Desc = predefinedStyled.Multimedia.Caption

export default class Youtube extends React.PureComponent {
  static propTypes = {
    data: predefinedPropTypes.elementData.isRequired,
  }

  render() {
    const { data } = this.props
    const id = _.get(data, 'content.0.youtubeId')
    const desc = _.get(data, 'content.0.description')
    return (
      <Block>
        <Iframe
          frameBorder="0"
          allowFullScreen={true}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          src={`https://www.youtube.com/embed/${id}`}
        />
        <Desc>{desc}</Desc>
      </Block>
    )
  }
}
