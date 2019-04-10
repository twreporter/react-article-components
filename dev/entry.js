import Article from '../src/components/article-page'
import mockPost from './mock-post.json'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(<Article post={mockPost} />, document.getElementById('root'))
