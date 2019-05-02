import Article from '../src/components/article-page'
import mockPost from './mock-post.json'
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import uh from '@twreporter/universal-header'

const HeaderContainerWithTransparentTheme = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
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
