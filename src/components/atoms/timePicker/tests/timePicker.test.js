import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import TimePicker from '..'

const fn = jest.fn()
const props = {
  onChange: fn
}

describe('<TimePicker>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<TimePicker {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders', () => {
    render(<TimePicker {...props} />)
  })

  it('selects time options', async () => {
    render(<TimePicker {...props} />)
    const hourSelected = { value: '2', name: '2' }
    const minuteSelected = { value: '15', name: '15' }
    const meridiemSelected = { value: 'PM', name: 'PM' }

    // Select hour
    const hourSelect = screen.queryAllByRole('combobox')[0]
    await userEvent.selectOptions(hourSelect, [hourSelected.value])
    expect(props.onChange).toHaveBeenCalledWith(hourSelected.value, undefined, 'AM')

    // Select minute
    const minuteSelect = screen.queryAllByRole('combobox')[1]
    await userEvent.selectOptions(minuteSelect, [minuteSelected.value])
    expect(props.onChange).toHaveBeenCalledWith(hourSelected.value, minuteSelected.value, 'AM')

    // Select meridiem
    const meridiemButton = screen.queryAllByRole('radio')[1]
    userEvent.click(meridiemButton)
    expect(props.onChange).toHaveBeenCalledWith(
      hourSelected.value,
      minuteSelected.value,
      meridiemSelected.value)
  })
})
