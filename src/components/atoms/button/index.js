import React from 'react'
import PropTypes from 'prop-types'
import RButton from 'react-bootstrap/Button'

import { COLORS, SIZES, BUTTON_VARIANT } from '@global/constants'
import MyProptypes from '@global/propTypes'

import { Icon } from '@components/atoms'

import styles from './styles.module.scss'

const Button = ({
  children,
  label,
  icon,
  color,
  size,
  variant,
  disabled,
  reverse,
  onClick,
  className,
  type,
  title
}) => {
  const buttonVariant = (() => {
    if (variant === 'link') return `link text-${color}`
    return `${variant === 'outline' ? 'outline-' : ''}${color}`
  })()

  const ghost = `
    text-${color}
    bg-transparent
    border-0
    ${styles.ghost}
  `

  const cn = `
    d-flex
    align-items-center
    justify-content-center
    ${reverse ? 'flex-row-reverse' : 'flex-row'}
    ${styles.button}
    ${variant === BUTTON_VARIANT.GHOST ? ghost : ''}
    ${className}
  `

  return (
    <RButton
      variant={buttonVariant}
      size={size}
      disabled={disabled}
      onClick={onClick}
      className={cn}
      role='button'
      title={title}
      type={type}
    >
      { children }
      { icon && <Icon name={icon} /> }
      { label && <span>{label}</span> }
    </RButton>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  icon: PropTypes.string,
  color: MyProptypes.colors,
  size: MyProptypes.sizes,
  variant: MyProptypes.buttonTypes,
  disabled: PropTypes.bool,
  reverse: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string
}

Button.defaultProps = {
  children: null,
  color: COLORS.PRIMARY,
  size: SIZES.MD,
  variant: BUTTON_VARIANT.SOLID,
  reverse: false,
  type: 'button'
}

export default Button
