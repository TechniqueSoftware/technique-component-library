import React from 'react'

import Tabs from '.'

export default {
  title: 'Components/Tabs',
  component: Tabs
}

const Template = args => <Tabs {...args} />

export const Default = Template.bind({})
Default.args = {
  tabs: [
    {
      id: 'tab1',
      title: 'Tab 1',
      content: <h1>Tab 1</h1>
    },
    {
      id: 'tab2',
      title: 'Tab 2',
      content: <h1>Tab 2</h1>
    },
    {
      id: 'tab3',
      title: 'Tab 3',
      content: <h1>Tab 3</h1>
    }
  ]
}
