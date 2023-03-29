import React, { useState, useRef, useEffect } from 'react'
import { ASF_IFRAME_SRC } from '@global/env'
import styles from './style.module.css'

const IframeASF = () => {
  const ref = useRef()
  const [height, setHeight] = useState('630px')

  const updateHeight = () => {
    const header = document.querySelector('header')
    const headerHeight = header.offsetHeight || header.scrollHeight
    const bodyHeight = document.body.offsetHeight || document.body.scrollHeight
    setHeight(`${bodyHeight - headerHeight - 30}px`)
  }

  useEffect(() => {
    if(!ref.current) return
    updateHeight()
  }, [ref.current])

  return (
    <iframe
      className={styles.asfIframe}
      onLoad={updateHeight}
      ref={ref}
      id='asfFrame'
      title='ASF'
      width='100%'
      height={height}
      src={`${ASF_IFRAME_SRC}/View/point-of-sale?customer=anonymous`}
    />
  )
}
export default IframeASF