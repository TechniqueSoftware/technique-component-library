import React from 'react'

import { Provider } from '@redux/utils'

import ScheduleNScripts from '.'

export default {
  title: 'Parts/Schedule and scripts',
  component: ScheduleNScripts,
  decorators: [
    Story => (
      <Provider>
        <Story />
      </Provider>
    )
  ]
}

const Template = args => <ScheduleNScripts {...args} />

export const Default = Template.bind({})
Default.args = {}
