import React from 'react'

import ToggleButton from '.'

export default {
  title: 'Atoms/ToggleButton',
  component: ToggleButton
}

const Template = args => <ToggleButton {...args} />

export const Default = Template.bind({})

Default.args = {
  radios: [
    { name: 'Active', value: '1' },
    { name: 'Radio', value: '2' },
    { name: 'Radio', value: '3' }
  ]
}
