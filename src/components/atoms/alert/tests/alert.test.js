import React from 'react'
import { render, screen } from '@testing-library/react'
import Alert from '../index'

const propVariations = {
  error: {
    code: 'FORM_SUBMISSION_ERROR',
    'First Name': 'This field is required',
    'Last Name': 'This field is required',
    Email: 'Please provide an email or phone number',
    Phone: 'Please provide an email or phone number'
  },
  success: {
    code: 'SUCCESS',
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe0@aol.com'
  },
  duplicate: {
    code: 'DUPLICATE_USER',
    user: {
      userId: 172194229,
      firstName: 'Geoff',
      lastName: 'Peel'
    }
  }
}

describe('<Alert>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Alert alertData={propVariations.success} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders a success alert', () => {
    render(<Alert alertData={propVariations.success} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('renders an error alert', () => {
    render(<Alert alertData={propVariations.error} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('alert alert-danger')
  })

  it('renders a duplicate user alert', () => {
    render(<Alert alertData={propVariations.duplicate} />)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('alert alert-warning')
  })
})
