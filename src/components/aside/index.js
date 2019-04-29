import predefinedProps from './prop-types'
import Metadata from './metadata'
import React from 'react'
import styled from 'styled-components'

const AsideFlexBox = styled.aside`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
`

export default class Aside extends React.PureComponent {
  static propTypes = predefinedProps

  render() {
    const {
      categories,
      designers,
      engineers,
      photographers,
      rawAutherText,
      tags,
      writers,
    } = this.props

    const metadataJSX = (
      <Metadata
        categories={categories}
        designers={designers}
        photographers={photographers}
        tags={tags}
        writers={writers}
        engineers={engineers}
        rawAutherText={rawAutherText}
      />
    )

    return (
      <AsideFlexBox>
        {metadataJSX}
        {metadataJSX}
      </AsideFlexBox>
    )
  }
}
