import Article from '../src/components/article-page'
import mockPost from './mock-post.json'
import React from 'react'
import ReactDOM from 'react-dom'

ReactDOM.render(
  <Article
    post={mockPost}
    elementColors={{
      date: '#55e07f',
      shape: '#73fa9c',
      subTitle: '#7e33f6',
      title: '#7e33f6',
      topicName: '#7e33f6',
      // body
      annotation: '#55e07f',
      annotationBackground: '#f4f4f4',
      centeredQuote: '#494949',
      centeredQutoteBy: '#494949',
      caption: '#494949',
      infoboxContent: '#494949',
      infoboxTitle: '#494949',
      infoboxBackground: '#f4f4f4',
      line: '#70f197',
      link: '#55e07f',
      metadataDefault: '#808080',
      metadataPrimary: '#55e07f',
      metadataSecodary: '#55e07f',
      paragraph: '#494949',
      blockquote: '#838383',
      blockquoteBorder: '#d8d8d8',
      sectionSubtitle: '#494949',
      sectionTitle: '#494949',
    }}
  />,
  document.getElementById('root')
)
