import React from 'react'

import { Provider } from '@redux/utils'
import { DeviceProvider } from '@utils/device'

import Inquiry from '.'

export default {
  title: 'Parts/New Phone Inquiry',
  component: Inquiry,
  decorators: [
    Story => (
      <Provider>
        <DeviceProvider>
          <div style={{ height: '100vh', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Story />
          </div>
        </DeviceProvider>
      </Provider>
    )
  ]
}

const Template = args => <Inquiry {...args} />

export const Default = Template.bind({})
Default.args = {}
