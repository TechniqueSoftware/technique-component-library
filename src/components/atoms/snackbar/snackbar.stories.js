import React from 'react'

import Snackbar from '.'

export default {
  title: 'Atoms/Snackbar',
  component: Snackbar
}

const Template = args => <Snackbar {...args} />

export const Default = Template.bind({})
Default.args = {
  handleClose: () => { },
  msg: 'Successfully created!'
}
