import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Input from '..'

const firstNameProps = {
  name: 'firstName',
  type: 'text',
  label: 'First Name',
  value: '',
  error: '',
  required: true,
  relatedField: null,
  validated: false,
  onChange: jest.fn(),
  onBlur: jest.fn()
}
const lastNameProps = {
  name: 'LastName',
  type: 'text',
  label: 'Last Name',
  value: '',
  error: '',
  required: true,
  relatedField: null,
  validated: false,
  onChange: jest.fn(),
  onBlur: jest.fn()
}

describe('<Input/>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Input {...firstNameProps} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render', () => {
    render(<Input {...firstNameProps} />)
    expect(screen.getByLabelText('First Name *')).toBeInTheDocument()
  })

  it('should render horizontal', () => {
    render(<Input {...firstNameProps} layoutHorizontal />)

    expect(screen.getByLabelText('First Name *')).toBeInTheDocument()
    expect(screen.getByLabelText('First Name *').parentElement).toHaveClass('col')
  })

  it('should show that the onChange function updates the props value', () => {
    render(<Input {...firstNameProps} />)
    userEvent.type(screen.getByLabelText('First Name *'), 't')
    expect(firstNameProps.onChange).toHaveBeenCalled()
  })

  it('should validate on exit ', () => {
    render(<><Input {...firstNameProps} /> <Input {...lastNameProps} /></>)
    userEvent.type(screen.getByLabelText('First Name *'), 'ts')
    expect(firstNameProps.onChange).toHaveBeenCalled()
    userEvent.tab()
    expect(screen.getByLabelText('Last Name *')).toHaveFocus()
  })
})
