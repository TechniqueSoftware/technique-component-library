import React from 'react'
import { render, screen } from '@testing-library/react'

import Dropdown from '..'

const props = {
  name: 'selectName',
  disclaimer: 'Disclaimer',
  label: 'Dropdown Label',
  onSelect: jest.fn(),
  selected: { value: '1', name: 'Option1' },
  options: [
    { value: '1', name: 'Option1' },
    { value: '2', name: 'Option2' },
    { value: '3', name: 'Option3' }
  ]
}

describe('<Dropdown/>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Dropdown {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('it renders', () => {
    render(<Dropdown {...props} />)
    expect(screen.queryByText('Dropdown Label')).toBeInTheDocument()
    expect(screen.queryByRole('button')).toBeInTheDocument()
  })
})
