import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Button } from '@components/atoms'
import { BUTTON_VARIANT } from '@global/constants'
import { CONTEXT_PATH } from '../../axios/constants'
import styles from './style.module.scss'
import POSIcon from '../../assets/svgs/POSIcon'
import IframeASF from './iframeASF'

const PosButton = () => {
  const buttonClassname = document.getElementById('new-phone-inquiry') ? '' : styles.posButtonContainerMargin

  const handleClick = () => {
    const redirectUrl = `${CONTEXT_PATH}/action/Delegate/0`
    localStorage.setItem('pos', 1)
    window.location.href = redirectUrl
  }

  useEffect(() => {
    if (localStorage.getItem('pos') === '1') {
      ReactDOM.render(<IframeASF />, document.getElementById('content-container'))
      localStorage.removeItem('pos')
    }
  }, [])

  return (
    <div className={buttonClassname}>
      <Button onClick={handleClick} title='Point of Sale' variant={BUTTON_VARIANT.LINK}>
        <POSIcon aria-label='pos order' />
      </Button>
    </div>
  )
}

export default PosButton
