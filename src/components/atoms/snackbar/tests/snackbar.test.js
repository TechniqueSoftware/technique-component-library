import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Snackbar from '..'

const fn = jest.fn()
const props = {
  msg: 'This snackbar is getting tested right now',
  handleClose: fn
}
const msg = 'This snackbar is getting tested right now'

describe('<Snackbar>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Snackbar {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders', () => {
    render(<Snackbar {...props} />)
    expect(screen.queryByText('This snackbar is getting tested right now')).toBeInTheDocument()
    const button = screen.getByLabelText('Close')
    expect(button).toBeInTheDocument()
  })

  it('closes when clicking on X ', () => {
    const buttonClose = jest.fn()
    render(<Snackbar msg={msg} handleClose={buttonClose} />)
    const button = screen.getByLabelText('Close')
    expect(button).toBeInTheDocument()
    userEvent.click(button)
    expect(buttonClose).toHaveBeenCalledTimes(1)
  })
})
