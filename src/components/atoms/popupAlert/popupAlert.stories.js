import React from 'react'

import PopupAlert from '.'

export default {
  title: 'Atoms/PopupAlert',
  component: PopupAlert
}

const Template = args => <PopupAlert {...args} />

export const Default = Template.bind({})
Default.args = {
  handleClose: () => { },
  msg: 'This is a popup Alert!'
}
