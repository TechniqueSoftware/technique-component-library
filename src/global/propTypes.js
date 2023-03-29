import PropTypes from 'prop-types'

import { COLORS, SIZES, BUTTON_VARIANT } from './constants'

const colors = PropTypes.oneOf(Object.values(COLORS))
const sizes = PropTypes.oneOf(Object.values(SIZES))
const buttonTypes = PropTypes.oneOf(Object.values(BUTTON_VARIANT))

export default {
  colors,
  sizes,
  buttonTypes
}
