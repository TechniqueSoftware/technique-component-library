import React from 'react'

import CheckBox from '.'

export default {
  title: 'Atoms/CheckBox',
  component: CheckBox
}

const Template = args => <CheckBox {...args} />

export const Default = Template.bind({})

Default.args = {
  options: [
    { name: 'Active', value: '1' },
    { name: 'Radio', value: '2' },
    { name: 'Radio', value: '3' }
  ],
  type: 'radio',
  name: 'radios'
}
