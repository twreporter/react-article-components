import themeConst from '../constants/theme'

/**
 *  @module ThemeManager
 */

/**
 *  Color set
 *  @typedef {Object} ColorSet
 *  @property {string} text - Text color
 *  @property {string} accent - Accent color
 *  @property {string} support - Support color
 *  @property {string} background - Background color
 */

/**
 *  Theme Colors
 *  @typedef {Object} ThemeColors
 *  @property {ColorSet} primary - Primary color set
 *  @property {ColorSet} secondary - Secondary color set
 *  @property {ColorSet} base - Base color set
 */

const secondaryColorSet = {
  text: '#a67a44',
  accent: '#a67a44',
  support: '#d0a67d',
  background: '#c9af8e',
}

const baseColorSet = {
  text: '#404040',
  lightText: '#808080',
  button: '#808080',
  line: '#afafaf',
  background: '#fff',
}

/**
 *  @class Create a new ThemeManager
 */
export default class ThemeManager {
  static colors = {
    pink: {
      primary: {
        text: '#355ed3',
        accent: '#ef7ede',
        support: '#fbafef',
        background: '#fadaf5',
      },
      secondary: secondaryColorSet,
      base: baseColorSet,
    },
    default: {
      primary: {
        text: '#a67a44',
        accent: '#a67a44',
        support: '#d0a67d',
        background: '#f4f4f4',
      },
      secondary: secondaryColorSet,
      base: baseColorSet,
    },
  }

  /**
   *  @param {string} [theme=article:v2:default] - Theme name
   *  @returns {undefined}
   */
  constructor(theme) {
    this.theme = theme
  }

  /**
   *  @param {string} [theme=article:v2:default] - Theme name
   *  @returns {ThemeColors}
   */
  getColors(theme = '') {
    const _theme = theme || this.theme

    switch (_theme) {
      case themeConst.article.v2.pink: {
        return ThemeManager.colors.pink
      }
      case themeConst.article.v2.photo:
      case themeConst.article.v2.default:
      default: {
        return ThemeManager.colors.default
      }
    }
  }
}
