import React from 'react'

import Select from '.'

export default {
  title: 'Atoms/Select',
  component: Select
}

const Template = args => <Select {...args} />

let selected
const onSelect = ({ value }) => {
  selected = value
}

export const Default = Template.bind({})
Default.args = {
  selected,
  onSelect,
  name: 'selectName',
  label: 'Select Label',
  options: [
    { value: 1, name: 'Option1' },
    { value: 2, name: 'Option2' },
    { value: 3, name: 'Option3' }
  ],
  required: true
}
