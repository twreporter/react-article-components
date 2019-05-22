import Article from '../src/components/article-page'
import mockPost from './mock-post.json'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import uh from '@twreporter/universal-header'

const HeaderContainerWithTransparentTheme = styled.div`
  position: relative;
  background-color: #fabcf0;
`

ReactDOM.render(
  <React.Fragment>
    <HeaderContainerWithTransparentTheme>
      <uh.StandaloneHeader theme="transparent" />
    </HeaderContainerWithTransparentTheme>
    <Article post={mockPost} />
  </React.Fragment>,
  document.getElementById('root')
)
