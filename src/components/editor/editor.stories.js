import React from 'react'

import Editor from '.'

export default {
  title: 'Components/Editor',
  component: Editor
}

const onChangeEditorState = ({ value }) => value
const onFocusHandler = () => ''
const Template = arg => <Editor {...arg} />

export const Default = Template.bind({})

Default.args = {
  onFocusHandler,
  onChangeEditorState,
  initValue: '<p>This is test message</p>',
  textToAdd: '',
  id: 'editor'
}
