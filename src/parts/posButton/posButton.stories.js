import { Provider } from '@redux/utils'
import { DeviceProvider } from '@utils/device'
import React from 'react'
import PosButton from '.'

export default {
  title: 'Parts/PosButton',
  component: PosButton
}

const Template = args => (
  <Provider>
    <DeviceProvider>
      <header style={{ height: '71px' }}></header>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}
      >
        <PosButton {...args} />
      </div>
      <div id='content-container'></div>
    </DeviceProvider>
  </Provider>
)

export const Default = Template.bind({})
Default.args = {}
