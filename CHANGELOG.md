# CHANGELOG

## UNRELEASED

## RELEASE

### 1.0.6

#### Default Theme(article:v2:default) Support

- Provide `primary`, `secondary` and `base` colors for default theme
- Support `extend`, `normal`, `fullscreen` and `small` leading block with default theme

#### Photo Theme(article:v2:photo) Support

- Provide `primary`, `secondary` and `base` colors for photo theme
- Support `extend`, `normal`, `fullscreen` and `small` leading block with photo theme

#### UIManager

- Introduce `UIManager(src/managers/ui-manager.js)` to handle theme and layout

### 1.0.5

- Update dependencies
- Take shared `prop-types` from `@twreporter/core`

### 1.0.4

- Remove `state.fontLevel` of `article-page.js`
- Remove `fontSizeOffset` from aside:metadata

### 1.0.3

- Update `src/components/article-page.js`

  - Prop naming change: `defaultFontLevel` -> `fontLevel`
  - Add `onFontLevelChange` prop
  - fontLevel update: base -> small, large -> medium, xLarge -> large

- Handle line breaks
  - Update blockquote, paragraph, list, and annotation

### 1.0.2

- Fix missing props of BookmarkWidget
- Update dependencies

### 1.0.0

- Init the repo
