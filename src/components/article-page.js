import Aside from './aside'
import Body from './body'
import get from 'lodash/get'
import LeadingBlock from './leading-block'
import predefinedPropTypes from '../constants/prop-types'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import merge from 'lodash/merge'

const _ = {
  get,
  merge,
}

const defaultColors = {
  primary: {
    text: '#55e07f',
    line: '#70f197',
    shape: '#73fa9c',
  },
  secondary: {
    text: '#7e33f6',
  },
  base: {
    text: '#494949',
    lightText: '#808080',
    line: '#d8d8d8',
    shape: '#f4f4f4',
  },
}

const BorderBox = styled.div`
  * {
    box-sizing: border-box;
  }
`

const BackgroundBlock = styled(BorderBox)`
  /* pass from ThemeProvider */
  background-color: ${props => props.theme.colors.primary.shape};

  padding-left: 10px;
  padding-right: 10px;
`

const HeaderBlock = styled.div``

const BodyBlock = styled.div`
  width: 100%;
  background-color: #fff;
`

const HorizontalCentered = styled.div`
  margin: 0 auto;
`

const FiveColumnsFB = styled(HorizontalCentered)`
  display: flex;
  width: ${mockup.desktop.body.width}px;
`

const FirstColumnFI = styled.div`
  flex: 1 1 ${mockup.desktop.column.width}px;
  margin-right: ${mockup.desktop.body.width / numOfColumns -
    mockup.desktop.column.width}px;
`

const RestColumnsFI = styled.div`
  flex: 1 1 ${(mockup.desktop.body.width / numOfColumns) * (numOfColumns - 1)}px;
`

const ThreeColumnsBlock = styled.div`
  width: ${(mockup.desktop.body.width / numOfColumns) * 3}px;
`

const FourColumnsBlock = styled.div`
  width: ${(mockup.desktop.body.width / numOfColumns) * 4}px;
`

function getColumnsBlock(type) {
  switch (type) {
    case 'image':
    case 'imageDiff':
    case 'imagediff':
    case 'slideshow':
    case 'youtube':
      return FourColumnsBlock
    default:
      return ThreeColumnsBlock
  }
}

export default class Article extends PureComponent {
  static propTypes = {
    colors: predefinedPropTypes.colors,
    post: PropTypes.object.isRequired,
  }

  static defaultProps = {
    colors: {},
  }

  render() {
    const { colors, post } = this.props
    return (
      <ThemeProvider theme={{ colors: _.merge({}, defaultColors, colors) }}>
        <BackgroundBlock>
          <HeaderBlock>
            <LeadingBlock />
          </HeaderBlock>
          <BodyBlock>
            <FiveColumnsFB>
              <FirstColumnFI>
                <Aside
                  categories={post.categories}
                  designers={post.designers}
                  photographers={post.photographers}
                  tags={post.tags}
                  writers={post.writters}
                  engineers={post.engineers}
                  rawAutherText={post.extend_byline}
                />
              </FirstColumnFI>
              <RestColumnsFI>
                <Body
                  brief={_.get(post, 'brief.api_data')}
                  content={_.get(post, 'content.api_data')}
                  renderBrief={(Brief, data) => {
                    return (
                      <ThreeColumnsBlock>
                        <Brief data={data} />
                      </ThreeColumnsBlock>
                    )
                  }}
                  renderElement={(Element, data) => {
                    const ColumnsBlock = getColumnsBlock(_.get(data, 'type'))
                    return (
                      <ColumnsBlock key={data.id}>
                        <Element data={data} />
                      </ColumnsBlock>
                    )
                  }}
                />
              </RestColumnsFI>
            </FiveColumnsFB>
          </BodyBlock>
        </BackgroundBlock>
      </ThemeProvider>
    )
  }
}
