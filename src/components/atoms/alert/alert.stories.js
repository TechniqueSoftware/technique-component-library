import React from 'react'

import Alert from '.'

export default {
  title: 'Atoms/Alert',
  component: Alert
}

const Template = args => <Alert {...args} />

export const Default = Template.bind({})
Default.args = {}
