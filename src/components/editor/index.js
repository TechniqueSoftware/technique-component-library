import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import './redactor/redactor.min.css'
import { SCRIPT_CONTACT_TYPES } from '@parts/scheduleNScripts/components/options/constants'
import Redactor from './redactor/redactor3.js'
import './redactor/alignment.min.js'
import './redactor/table.min.js'
import './redactor/imagemanager.min.js'
import './redactor/fontcolor.min.js'
import './redactor/fontfamily.min.js'
import './redactor/fontsize.min.js'
import styles from './styles.module.scss'
import { CONTEXT_PATH } from '../../axios/constants'

const EditorContainer = ({
  onFocusHandler,
  onChangeEditorState,
  textToAdd,
  id,
  initValue,
  editorRef,
  actionType
}) => {
  let app
  const handleChange = () => {
    if (editorRef) { onChangeEditorState(editorRef.current.previousSibling.innerHTML.replace(/\uFEFF/g, '')) }
  }

  useEffect(() => {
    app = Redactor(`#${id}`, {
      callbacks: {
        keyup: () => handleChange(),
        click: () => handleChange(),
        focus: () => onFocusHandler(),
        dropdown: {
          closed: () => {
            handleChange()
          }
        },
        modal: {
          closed: () => {
            handleChange()
          }
        },
        source: {
          changed: html => {
            onChangeEditorState(html)
          },
          closed: () => {
            handleChange()
          }
        },
        line: {
          inserted: () => {
            handleChange()
          }
        }
      },
      buttonsAddAfter: {
        after: 'lists',
        buttons: ['line']
      },
      plugins: ['alignment', 'table', 'imagemanager', 'fontfamily', 'fontsize', 'fontcolor'],
      imageUpload: `${CONTEXT_PATH}/action/RedactorUpload/uploadNew?isNewEditor=true`,
      imageResizable: true,
      imagePosition: true
    })
  })

  useEffect(() => {
    if (textToAdd) {
      app.insertion.insertText(textToAdd)
      handleChange()
    }
  }, [textToAdd])

  return (
    <div
      className={`${styles.editor} ${
        actionType === SCRIPT_CONTACT_TYPES.SMS ? styles.editorWithoutToolbar : ''
      }`}
    >
      <textarea
        aria-label={id}
        ref={editorRef}
        id={id}
        name={id}
        defaultValue={initValue}
        onChange={e => handleChange(e.target.innerHTML)}
      />
    </div>
  )
}

EditorContainer.propTypes = {
  onChangeEditorState: PropTypes.func,
  textToAdd: PropTypes.string,
  id: PropTypes.string,
  initValue: PropTypes.string,
  onFocusHandler: PropTypes.func,
  editorRef: PropTypes.any,
  actionType: PropTypes.number
}

EditorContainer.defaultProps = {
  id: 'editor'
}

export default EditorContainer
