import React from 'react'
import { render, screen } from '@testing-library/react'
import IframeASF from '../iframeASF'

describe('<PosButton>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<IframeASF />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders', () => {
    render(<IframeASF />)
    screen.debug(screen.getByTitle('ASF'))
    expect(screen.getByTitle('ASF')).toBeInTheDocument()
  })
})
