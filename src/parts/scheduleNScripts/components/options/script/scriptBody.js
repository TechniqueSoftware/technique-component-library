import React, { useState, useRef, useEffect } from 'react'
import { Row, Col, Form } from 'react-bootstrap'
import { Button, Input, Select } from '@components/atoms'
import { Editor } from '@components'
import { COLORS } from '@global/constants'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { removeTagsFromText, DYNAMIC_TAG_REGEX } from '@utils/'
import { validateScriptBody, validateScriptTags } from '@utils/validation'
import { GLOBAL_SELECTOR } from '@redux/global'
import { TP_ACTION_TYPES } from '@parts/scheduleNScripts/constants'
import { ACTIONS, SELECTORS } from '@parts/scheduleNScripts/redux'
import styles from '../styles.module.scss'

const getInitialEmailSubject = scripts => {
  if (!scripts) return ''
  const emailScript = scripts.find(item => item.actionType === TP_ACTION_TYPES.EMAIL)
  if (!emailScript || !emailScript.emailSubject) return ''
  return emailScript.emailSubject
}

const ScriptBody = ({
  dataSchedule,
  actionType,
  dynamicTags,
  tabId,
  setValidMinute,
  followUpToggle,
  setScriptsToSave,
  scriptsToSave
}) => {
  const { optOutTextOnEveryMessage } = useSelector(GLOBAL_SELECTOR.CLUB)
  const { data } = useSelector(SELECTORS.TOUCHPOINT_CRUD)
  const canEditScripts = useSelector(SELECTORS.CAN_EDIT_SCRIPTS)
  const {
    daysTillNext,
    dayNum,
    rowName,
    followUpSeqNum,
    followUpStatus,
    followUpType,
    clubId,
    locationId,
    scripts,
    segmentId
  } = data

  const { followUpTime, primaryAction, secondaryAction, followUpMinutes } = dataSchedule
  const dispatch = useDispatch()
  const editorRef = useRef(null)

  const [emailFieldFocused, setEmailFieldFocused] = useState(false)
  const [selectedTag, setSelectedTag] = useState('')
  const [emailSubject, setEmailSubject] = useState(getInitialEmailSubject(scripts))
  const [emailTargetPosition, setEmailTargetPosition] = useState({ start: 0, end: 0 })

  const handleClose = () => dispatch(ACTIONS.TOUCHPOINT.CLOSE())

  const currentScript = scripts && scripts.find(scr => scr.actionType === tabId)
  const initTextArea = currentScript?.script || ''
  const optOutTextMsgEnabled = optOutTextOnEveryMessage && followUpToggle === 'manual'
  const [textArea, setTextArea] = useState(initTextArea)
  const optOutText = ' | To stop these messages, reply STOP'
  const [characterCount, setCharacterCount] = useState(optOutTextOnEveryMessage ? optOutText.length : 0)

  const updateScripts = scriptContent => {
    const newScript = {
      daysTillNext,
      followUpSeqNum,
      followUpStatus,
      followUpType,
      clubId,
      locationId,
      actionType,
      script: textArea,
      segmentId,
      ...scriptContent
    }
    const updatedScripts = scriptsToSave.map(script => {
      if (script.actionType !== tabId) return script
      return { ...script, ...scriptContent }
    })
    const scriptExists = !!updatedScripts.find(s => s.actionType === actionType)
    const hasNoContent = !textArea && !emailSubject
    setScriptsToSave(scriptExists || hasNoContent ? updatedScripts : updatedScripts.concat(newScript))
  }

  useEffect(() => {
    updateScripts({ script: textArea })
    if (actionType === TP_ACTION_TYPES.TEXT) {
      const cleanText = removeTagsFromText(textArea.replace(/&nbsp;/g, ' '))
      const foundTags = cleanText.match(DYNAMIC_TAG_REGEX)
      updateScripts({ script: cleanText })
      if (!foundTags) {
        return setCharacterCount(optOutTextOnEveryMessage
          ? cleanText.length + optOutText.length : cleanText.length)
      }
      const noTagsText = foundTags.reduce((acc, curr) => acc.replace(curr, ''), cleanText)
      setCharacterCount(optOutTextOnEveryMessage ? noTagsText.length + optOutText.length : noTagsText.length)
    }
  }, [textArea])

  const handleEditorFocus = () => {
    setEmailFieldFocused(false)
  }

  const handleSave = () => {
    if (followUpMinutes < 0 || followUpMinutes > 10000) return setValidMinute(false)
    const scriptContent = editorRef.current.previousSibling.innerHTML.replace(/\uFEFF/g, '')
    const text = removeTagsFromText(scriptContent)
    const bodyError = followUpToggle === 'auto' ? validateScriptBody(scriptsToSave, dataSchedule) : null
    if (bodyError) return alert(bodyError)
    const tagsErrors = validateScriptTags(text, dynamicTags).concat(
      validateScriptTags(emailSubject, dynamicTags)
    )
    if (tagsErrors.length) {
      const alertMsg = `The script has the following dynamic content errors:\n${tagsErrors
        .map(err => err)
        .join('\n')}`
      return alert(alertMsg)
    }
    const scheduleData = {
      clubId,
      locationId,
      followUpType,
      followUpStatus,
      followUpSeqNum,
      daysTillNext,
      autoEnabled: false,
      locationSegmentId: segmentId
    }
    const followUpSchedule = followUpToggle !== 'auto'
      ? scheduleData
      : {
        ...scheduleData,
        followUpTime,
        followUpMinutes,
        primaryAction,
        secondaryAction
      }
    dispatch(ACTIONS.SCRIPTS.SAVE({ scriptsToSave, followUpSchedule }))
  }

  const updateEmailSubject = value => {
    setEmailSubject(value)
    updateScripts({ emailSubject: value })
  }

  const handleSubject = subject => {
    const { e, value } = subject
    setEmailTargetPosition({ start: e.target.selectionStart, end: e.target.selectionEnd })
    setEmailFieldFocused(true)
    updateEmailSubject(value)
  }

  const handleDynamicTag = value => {
    const selectTag = value.value.value
    if (!emailFieldFocused) return setSelectedTag(selectTag)
    const updatedEmailSubject = `${emailSubject.substring(
      0,
      emailTargetPosition.start
    )}${selectTag}${emailSubject.substring(emailTargetPosition.end)}`
    return updateEmailSubject(updatedEmailSubject)
  }

  const displayName = dayNum === 0 ? 'Immediate' : `Day ${dayNum}`
  return (
    <Row>
      <Col className='form-col'>
        <h5>
          Follow-Up Script: {rowName} {displayName}
        </h5>
        <Form>
          <Row>
            <Col sm={8} className='mb-3'>
              <Select
                disabled={!canEditScripts}
                name={`dynamicContent${tabId}`}
                label='Add Dynamic Content'
                options={dynamicTags}
                required
                onSelect={value => handleDynamicTag(value)}
                layoutHorizontal
              />
            </Col>
            <Col sm={4} />
          </Row>
          {actionType === TP_ACTION_TYPES.EMAIL && (
            <Row>
              <Col sm={8}>
                <Input
                  disabled={!canEditScripts}
                  label='Email Subject'
                  value={emailSubject}
                  name='emailSubject'
                  onChange={handleSubject}
                  layoutHorizontal
                />
              </Col>
              <Col sm={4} />
            </Row>
          )}
          <Form.Group as={Row} id='editortext'>
            {canEditScripts ? (
              <Editor
                editorRef={editorRef}
                onFocusHandler={handleEditorFocus}
                id={`scriptBody-${tabId}`}
                textToAdd={selectedTag}
                actionType={actionType}
                initValue={initTextArea}
                onChangeEditorState={setTextArea}
              />
            ) : (
              <div
                className={`${styles.readonlyScript} mx-auto mb-2 p-2`}
                dangerouslySetInnerHTML={{ __html: initTextArea }}
              />
            )}
            {actionType === TP_ACTION_TYPES.TEXT && (
              <span>
                Club OS limits text messages to 300 characters. Your message is currently{' '}
                {characterCount} characters, not including dynamic content, which will use
                additional characters.{' '}
                {optOutTextMsgEnabled
                  && 'The opt-out option appended to all messages is included in this character count.'}
              </span>
            )}
          </Form.Group>

          {canEditScripts ? (
            <Form.Group as={Row} className='mb-3'>
              <Col sm={12}>
                <div className={styles.btnContainer}>
                  <Button
                    className={`m-1 ${styles.saveBtn}`}
                    color={COLORS.PRIMARY}
                    label='Cancel'
                    onClick={handleClose}
                    size='lg'
                    variant='outline'
                  />
                  <Button
                    className={`m-1 ${styles.saveBtn}`}
                    color={COLORS.PRIMARY}
                    label='Save'
                    onClick={handleSave}
                    size='lg'
                  />
                </div>
              </Col>
            </Form.Group>
          ) : null}
        </Form>
      </Col>
    </Row>
  )
}

ScriptBody.propTypes = {
  followUpToggle: PropTypes.string,
  dataSchedule: PropTypes.object,
  dynamicTags: PropTypes.array,
  actionType: PropTypes.number,
  tabId: PropTypes.number,
  setScriptsToSave: PropTypes.func,
  scriptsToSave: PropTypes.array,
  setValidMinute: PropTypes.func
}

export default ScriptBody
