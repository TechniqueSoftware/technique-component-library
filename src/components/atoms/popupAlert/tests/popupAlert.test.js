import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import PopupAlert from '..'

const fn = jest.fn()
const props = {
  msg: 'This popupAlert is getting tested right now',
  handleClose: fn
}
const msg = 'This popupAlert is getting tested right now'

describe('<PopupAlert>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<PopupAlert {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders', () => {
    render(<PopupAlert {...props} />)
    expect(screen.queryByText('This popupAlert is getting tested right now')).toBeInTheDocument()
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('closes when clicking on OK', () => {
    const buttonClose = jest.fn()
    render(<PopupAlert msg={msg} handleClose={buttonClose} />)
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    userEvent.click(button)
    expect(buttonClose).toHaveBeenCalledTimes(1)
  })
})
