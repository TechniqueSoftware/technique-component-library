import React from 'react'

import Tooltip from '.'

export default {
  title: 'Components/Tooltip',
  component: Tooltip
}

const Template = args => <Tooltip {...args} />

export const Default = Template.bind({})
Default.args = {}
