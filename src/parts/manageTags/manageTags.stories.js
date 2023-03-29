import React from 'react'

import { Provider } from '@redux/utils'
import { DeviceProvider } from '@utils/device'

import ManageTags from '.'

export default {
  title: 'Parts/Manage Tags/Manage Tags',
  component: ManageTags,
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

const Template = args => <ManageTags {...args} />

export const Default = Template.bind({})
Default.args = {}
