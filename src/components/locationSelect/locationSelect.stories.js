import React from 'react'

import { Provider } from '@redux/utils'

import LocationSelect from '.'

export default {
  title: 'Components/LocationSelect',
  component: LocationSelect,
  decorators: [
    Story => (
      <Provider>
        <Story />
      </Provider>
    )
  ]
}

// TODO: Remove line below once scripts modal is built with React and we get rid of handleRedirect functionality
window.open = () => {}
const Template = args => <LocationSelect {...args} />

export const Default = Template.bind({})
Default.args = {}
