import React from 'react'
import PropTypes from 'prop-types'
import styles from './styles.module.scss'

const ToggleCheck = ({ name, title, onChange, checked }) => (
  <label htmlFor={name}>
    <div className={styles.toggleCheckWrapper}>
      <input
        checked={checked}
        className={styles.toggleCheckInput}
        name={name}
        id={name}
        onChange={onChange}
        type='checkbox'
      />
      <span className={styles.toggleCheckSlider} />
    </div>
    {title}
  </label>
)

ToggleCheck.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  checked: PropTypes.bool
}

export default ToggleCheck
