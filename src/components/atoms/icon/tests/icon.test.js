import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Icon from '..'

const fn = jest.fn()

describe('<Icon>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Icon icon='icon-phone' className='d-block' />)
    expect(asFragment()).toMatchSnapshot()
  })

  describe('Regular icon', () => {
    it('renders', () => {
      render(<Icon name='BsFillBugFill' />)
      const icon = screen.getByRole('img')
      expect(icon).toBeInTheDocument()
      expect(icon.getElementsByTagName('svg')[0]).toBeInTheDocument()
    })
  })

  describe('Action icon', () => {
    it('renders', () => {
      render(<Icon name='BsFillBugFill' onClick={fn} />)
      const icon = screen.getByRole('button')
      expect(icon).toBeInTheDocument()
      expect(icon.getElementsByTagName('svg')[0]).toBeInTheDocument()
    })

    it('calls onClick', () => {
      render(<Icon name='BsFillBugFill' onClick={fn} />)
      const icon = screen.getByRole('button')
      userEvent.click(icon)
      expect(fn).toHaveBeenCalled()
    })
  })
})
