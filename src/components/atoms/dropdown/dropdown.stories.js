import React from 'react'

import Dropdown from '.'

export default {
  title: 'Atoms/Dropdown',
  component: Dropdown
}

const Template = args => <Dropdown {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'dropdown-id',
  onSelect: () => {},
  selected: {
    name: 'Option 1',
    value: 'opt-1',
    data: {
      icon: 'SALES_LEAD',
      text: '3 people - Appt'
    }
  },
  options: [
    {
      name: 'Option 1',
      value: 'opt-1',
      data: {
        icon: 'SALES_LEAD',
        text: '3 people - Appt'
      }
    },
    {
      name: 'Option 2',
      value: 'opt-2',
      icon: ''
    },
    {
      name: 'Option 3',
      value: 'opt-3',
      icon: ''
    }
  ]
}
