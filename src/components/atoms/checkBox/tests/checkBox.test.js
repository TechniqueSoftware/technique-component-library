import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Checkbox from '..'

const fn = jest.fn()
const props = {
  onChange: fn,
  options: [
    { value: 3, name: 'SMS' },
    { value: 2, name: 'Email' }
  ]
}

describe('<Checkbox>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Checkbox {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Selects options', () => {
    render(<Checkbox {...props} />)
    const optionSelected = { value: 3, name: 'SMS' }
    const checkboxButton = screen.queryAllByRole('checkbox')[0]
    userEvent.click(checkboxButton)
    expect(props.onChange).toHaveBeenCalledWith([optionSelected.value])
  })
})
