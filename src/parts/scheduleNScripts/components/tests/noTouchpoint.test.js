import React from 'react'
import { render, screen } from '@testing-library/react'
import NoTouchPoint from '../../statusSchedules/noTouchpoint'

describe('Schedule and scripts <StatusSchedules />', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<NoTouchPoint />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders title on left', () => {
    render(<NoTouchPoint />)
    expect(screen.getByText('No touchpoints have been configured')).toBeInTheDocument()
  })
})
