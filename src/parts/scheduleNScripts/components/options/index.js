import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import Card from 'react-bootstrap/Card'

import { Offcanvas } from '@components'

import Options from './options'
import New from './new'
import ScriptsModal from './scriptsModal'
import { TP_ACTION_TYPES } from '../../constants'
import { ACTIONS, SELECTORS, TP_OPTIONS } from '../../redux'

import styled from './styles.module.scss'

const Menu = ({ handleScript }) => {
  const dispatch = useDispatch()
  const tp = useSelector(SELECTORS.TOUCHPOINT_CRUD)

  const scriptAction = (
    tp.action === TP_ACTION_TYPES.CALL
    || tp.action === TP_ACTION_TYPES.EMAIL
    || tp.action === TP_ACTION_TYPES.TEXT
  )

  const handleClose = () => {
    dispatch(ACTIONS.TOUCHPOINT.CLOSE())
  }
  const title = scriptAction ? 'Configure Follow Up Contact' : ''

  const [hasCloseButton, setHasCloseButton] = useState(true)

  const getTitle = () => {
    if (!tp) return <p>Touchpoint</p>

    const { action, data } = tp

    const ttl = action === TP_OPTIONS.MENU ? 'Edit' : 'Touchpoint'
    const sub = action === TP_OPTIONS.MENU ? `${data.rowName} ${data.displayName}` : data.displayName
    return (
      <p className='fs-5 fw-bold mb-4'>
        {ttl}: <span className='text-muted'>{sub}</span>
      </p>
    )
  }

  const getContent = () => {
    if (tp.action === TP_OPTIONS.MENU) return <Options {...tp.data} handleScript={handleScript} />
    if (tp.action === TP_OPTIONS.NEW) return <New {...tp.data} setHasCloseButton={setHasCloseButton} />
    if (tp.action === TP_OPTIONS.EDIT) return <New {...tp.data} edit setHasCloseButton={setHasCloseButton} />
    if (scriptAction) return <ScriptsModal />

    return null
  }

  if (!tp.action) return null

  return (
    <Offcanvas
      close={hasCloseButton}
      show={!!tp.action}
      handleClose={handleClose}
      exludeCloseClass={[
        '.redactor-dropdown',
        '.redactor-modal-box',
        '.redactor-context-toolbar',
        '#redactor-image-resizer'
      ]}
      title={title}
      canvasClass={scriptAction ? styled.canvas : ''}
    >
      {!scriptAction && getTitle()}

      <Card className={`shadow-sm ${scriptAction ? styled.editCardScript : styled.editCard}`}>
        {scriptAction ? getContent() : <Card.Body className={styled.card}>{getContent()}</Card.Body>}
      </Card>
    </Offcanvas>
  )
}

Menu.propTypes = {
  handleScript: PropTypes.func
}

export default Menu
