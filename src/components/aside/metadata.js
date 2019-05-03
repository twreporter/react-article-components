import predefinedProps from './prop-types'
import React, { PureComponent } from 'react'
import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import styled from 'styled-components'
import mq from '../../utils/media-query'

const _ = {
  map,
  sortBy,
}

const MetadataContainer = styled.div`
  max-width: 180px;
  letter-spacing: 0.4px;
  ${mq.hdOnly`
    max-width: 250px;
  `}
`

const SeparationLine = styled.div`
  width: 100%;
  height: 12px;
  border-right: solid 0.5px #d8d8d8;
`

const UpperSeparationLine = styled(SeparationLine)`
  border-top: solid 0.5px #d8d8d8;
  margin-bottom: -2px;
`

const LowerSeparationLine = styled(SeparationLine)`
  border-bottom: solid 0.5px #d8d8d8;
`

const StyledText = styled.div`
  font-size: ${props => props.theme.fontSizeOffset + props.fontSize}px;
  font-weight: ${props => props.fontWeight || 'normal'};
`

const CategoryFlexBox = styled.div`
  display: flex;
`

const CategoryFlex = styled.div`
  flex-grow: 1;
`

const CategoryText = styled(StyledText)`
  color: ${props => props.theme.colors.primary.text};
  font-size: ${props => props.theme.fontSizeOffset + 16}px;
  line-height: 1.5;
  padding-left: 5px;
`

const AuthorSection = styled.div`
  margin-top: 15px;
  margin-bottom: 45px;
`

const AuthorFlexBox = styled.div`
  display: flex;
  margin-bottom: 6px;
`

const NoShrinkFlexItem = styled.div`
  flex-shrink: 0;
`

const authorTextHeight = 20 // px

const AuthorJobTitle = styled(StyledText)`
  color: #808080;
  margin-left: ${props => props.marginLeft || '0'}px;
  line-height: ${props => authorTextHeight / props.fontSize};
`

const AuthorName = styled(AuthorJobTitle)`
  color: ${props => props.theme.colors.primary.text};

  ${mq.mobileOnly`
    display: inline-block;
  `}
`

const RawAuthorText = styled(StyledText)`
  color: #808080;
  padding-left: 5px;
`

const AngledSeparationLine = styled.div`
  border-bottom: 0.5px solid ${props => props.theme.colors.primary.line};
  width: 27.7px;
  height: ${authorTextHeight / 2}px;
  transform: rotate(-25deg);
  margin-left: -18px;
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
        <CategoryFlex key={`category_${cat.id}`}>
          <UpperSeparationLine />
          <StyledA href={`/categories/${cat.id}`}>
            <CategoryText fontWeight={index === 0 ? 'bold' : 'normal'}>
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
        <LowerSeparationLine />
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
          <AuthorName fontSize={16} marginLeft="8">
            {author.name}
          </AuthorName>
        </StyledA>
      )
    })

    return (
      <AuthorFlexBox>
        <NoShrinkFlexItem>
          <AuthorJobTitle fontSize={14} marginLeft="5">
            {label}
          </AuthorJobTitle>
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
        <UpperSeparationLine />
        {this.renderAuthorsRow('文字', writers)}
        {this.renderAuthorsRow('攝影', photographers)}
        {this.renderAuthorsRow('設計', designers)}
        {this.renderAuthorsRow('工程', engineers)}
        <RawAuthorText fontSize={14}>{rawAutherText}</RawAuthorText>
      </AuthorSection>
    )
  }

  render() {
    return (
      <MetadataContainer>
        {this.renderCategorySection()}
        {this.renderAuthorsSection()}
        {this.renderTagsSection()}
      </MetadataContainer>
    )
  }
}

export default Metadata
