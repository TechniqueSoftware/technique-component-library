import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import Tooltip from '..'

describe('<Tooltip>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Tooltip />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders child', () => {
    render(
      <Tooltip>
        <p>minga</p>
      </Tooltip>
    )
    expect(screen.getByText('minga')).toBeInTheDocument()
  })

  it('shows tooltip', async () => {
    const baseDom = render(
      <Tooltip message='tooltip'>
        <p>minga</p>
      </Tooltip>
    )
    fireEvent.mouseOver(baseDom.getByText('minga'))
    expect(
      await baseDom.findByText('tooltip')
    ).toBeInTheDocument()
  })
})
