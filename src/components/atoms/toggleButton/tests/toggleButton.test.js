import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ToggleButton from '..'

const fn = jest.fn()
const props = {
  onChange: fn,
  radios: [
    { value: 'AM', name: 'AM' },
    { value: 'PM', name: 'PM' }
  ]
}

describe('<Checkbox>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<ToggleButton {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Selects options', () => {
    render(<ToggleButton {...props} />)
    const optionSelected = { value: 'PM', name: 'PM' }
    const toggleButton = screen.queryAllByRole('radio')[1]
    userEvent.click(toggleButton)
    expect(props.onChange).toHaveBeenCalledWith(optionSelected.value)
  })
})
