import predefinedProps from './prop-types'
import React, { PureComponent } from 'react'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import styled, { css } from 'styled-components'
import mq from '../../utils/media-query'

const _ = {
  map,
  sortBy,
}

const MetadataContainer = styled.div`
  letter-spacing: 0.4px;

  ${mq.mobileOnly`
    width: calc(300/355*100%);
    margin: 0 auto;
  `}

  ${mq.tabletOnly`
    width: 513px;
    margin: 0 auto;
  `}
`

const createLine = topOrBottom => {
  return css`
    position: relative;
    border-${topOrBottom}: solid 0.5px #d8d8d8;
    padding-${topOrBottom}: 15px;

    &::after {
      content: '';
      border-right: solid 0.5px #d8d8d8;
      width: 1px;
      height: 12px;
      ${topOrBottom}: 0;
      right: 0;
      position: absolute;
    }
  `
}

const CategoryFlexBox = styled.div`
  display: flex;
`

const CategoryFlex = styled.div`
  ${createLine('top')}
  flex-grow: ${props => props.flexGrow};

  ${mq.tabletAndBelow`
    padding-right: 15px;
    padding-left: 15px;
  `}

  ${mq.desktopAndAbove`
    padding-right: 5px;
    padding-left: 5px;
  `}
`

const CategoryText = styled.div`
  color: ${props => props.theme.colors.secondary.text};
  font-size: ${props => props.theme.fontSizeOffset + 16}px;
  line-height: 1;
  padding-left: 5px;
`

const DateSection = styled.div`
  ${createLine('top')}
  font-size: 14px;
  color: #9c9c9c;
  margin-left: 5px;
  margin-top: 15px;

  &::before {
    content: '刊出日期';
    margin-right: 10px;
  }
`

const AuthorSection = styled.div`
  margin-top: 15px;
  margin-bottom: 45px;
`

const AuthorFlexBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`

const NoShrinkFlexItem = styled.div`
  flex-shrink: 0;
`

const AuthorJobTitle = styled.div`
  font-size: ${props => props.theme.fontSizeOffset + 14}px;
  color: #808080;
  margin-left: 5px;
  line-height: 1;
`

const AuthorName = styled(AuthorJobTitle)`
  color: ${props => props.theme.colors.secondary.text};
  font-size: ${props => props.theme.fontSizeOffset + 16}px;
  margin-left: 5px;

  ${mq.mobileOnly`
    display: inline-block;
  `}
`

const RawAuthorText = styled.div`
  font-size: ${props => props.theme.fontSizeOffset + 14}px;
  color: #808080;
  padding-left: 5px;
`

const AngledSeparationLine = styled.div`
  border-bottom: 0.5px solid ${props => props.theme.colors.primary.line};
  width: 15px;
  transform: rotate(-45deg);
`

const TagButton = styled.div`
  border: solid 1px #808080;
  border-radius: 50px;
  padding: 5px 10px 5px 10px;
  font-size: ${props => props.theme.fontSizeOffset + 14}px;
  font-weight: normal;
  color: #808080;
  margin-bottom: 10px;
  margin-right: 10px;

  &:before {
    content: '#';
  }
`

const TagsSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;

  ${createLine('bottom')}
`

const StyledA = styled.a`
  text-decoration: none;
`

class Metadata extends PureComponent {
  static propTypes = predefinedProps.metadata

  static defaultProps = {
    categories: [],
    tags: [],
    writers: [],
    photographers: [],
    designers: [],
    engineers: [],
    rawAutherText: '',
  }

  renderCategorySection() {
    const { categories } = this.props

    _.sortBy(categories, ['sort_order'])

    const categoriesJSX = _.map(categories, (cat, index) => {
      return (
        <CategoryFlex key={`category_${cat.id}`} flexGrow={index}>
          <StyledA href={`/categories/${cat.id}`}>
            <CategoryText
              style={{ fontWeight: index === 0 ? 'bold' : 'normal' }}
            >
              {cat.name}
            </CategoryText>
          </StyledA>
        </CategoryFlex>
      )
    })

    return <CategoryFlexBox>{categoriesJSX}</CategoryFlexBox>
  }

  renderTagsSection() {
    const { tags } = this.props

    const tagsJSX = _.map(tags, tag => {
      return (
        <StyledA key={`tag_${tag.id}`} href={`/tags/${tag.id}`}>
          <TagButton>{tag.name}</TagButton>
        </StyledA>
      )
    })

    return (
      <React.Fragment>
        <TagsSection>{tagsJSX}</TagsSection>
      </React.Fragment>
    )
  }

  renderAuthorsRow(label, authors) {
    if (authors.length === 0) {
      return null
    }

    const authorNamesJSX = _.map(authors, author => {
      return (
        <StyledA key={`author_${author.id}`} href={`/authors/${author.id}`}>
          <AuthorName>{author.name}</AuthorName>
        </StyledA>
      )
    })

    return (
      <AuthorFlexBox>
        <NoShrinkFlexItem>
          <AuthorJobTitle>{label}</AuthorJobTitle>
        </NoShrinkFlexItem>
        <NoShrinkFlexItem>
          <AngledSeparationLine />
        </NoShrinkFlexItem>
        <div>{authorNamesJSX}</div>
      </AuthorFlexBox>
    )
  }

  renderAuthorsSection() {
    const {
      designers,
      engineers,
      photographers,
      writers,
      rawAutherText,
    } = this.props

    return (
      <AuthorSection>
        {this.renderAuthorsRow('文字', writers)}
        {this.renderAuthorsRow('攝影', photographers)}
        {this.renderAuthorsRow('設計', designers)}
        {this.renderAuthorsRow('工程', engineers)}
        <RawAuthorText>{rawAutherText}</RawAuthorText>
      </AuthorSection>
    )
  }

  render() {
    const date = this.props.date
      ? new Date(this.props.date).toLocaleString('zh-hant', {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        })
      : ''

    return (
      <MetadataContainer>
        {this.renderCategorySection()}
        <DateSection>{date}</DateSection>
        {this.renderAuthorsSection()}
        {this.renderTagsSection()}
      </MetadataContainer>
    )
  }
}

export default Metadata
