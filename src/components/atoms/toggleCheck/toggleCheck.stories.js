import React from 'react'

import ToggleCheck from '.'

export default {
  title: 'Atoms/ToggleCheck',
  component: ToggleCheck
}

const Template = args => <ToggleCheck {...args} />

export const Default = Template.bind({})

Default.args = {
  title: 'Toggle check'
}
