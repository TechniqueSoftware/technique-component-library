import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PosButton from '..'

describe('<PosButton>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<PosButton />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders', () => {
    render(<PosButton />)
    expect(screen.getByLabelText('pos order')).toBeInTheDocument()
  })

  it('button click', () => {
    render(<PosButton />)
    expect(screen.getByLabelText('pos order')).toBeInTheDocument()
    userEvent.click(screen.getByLabelText('pos order'))
    expect(localStorage.getItem('pos')).toBe('1')
  })
})
