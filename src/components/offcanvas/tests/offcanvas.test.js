import React from 'react'
import { render, screen } from '@testing-library/react'
import Offcanvas from '..'

describe('<Offcanvas>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Offcanvas />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders', () => {
    render(
      <Offcanvas show>
        <p>offcanvas</p>
      </Offcanvas>
    )
    expect(screen.getByText('offcanvas')).toBeInTheDocument()
  })

  it('renders with title', () => {
    render(
      <Offcanvas show title='title'>
        <p>offcanvas</p>
      </Offcanvas>
    )
    expect(screen.getByText('title')).toBeInTheDocument()
  })
})
