import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'

import { TestProvider as Provider } from '@redux/utils'
import userEvent from '@testing-library/user-event'
import Inquiry from '..'

import { state } from './redux/mock'
import { ACTIONS } from '../redux'

jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(state))
const mockDispatch = jest.fn()
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)

describe('<Inquiry/>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Provider><Inquiry /></Provider>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the modal button', () => {
    render(<Provider><Inquiry /></Provider>)
    const TIButton = screen.getByText('T.I. Inquiry')
    expect(TIButton).toBeInTheDocument()
  })

  it('opens modal', () => {
    render(<Provider><Inquiry /></Provider>)
    const TIButton = screen.getByText('T.I. Inquiry')
    expect(TIButton).toBeInTheDocument()
    expect(screen.queryByText('Add Telephone Inquiry')).not.toBeInTheDocument()
    userEvent.click(TIButton)
    expect(screen.queryByText('Add Telephone Inquiry')).toBeInTheDocument()
    expect(screen.queryByText('Location')).toBeInTheDocument()
    expect(screen.queryByText('First Name *')).toBeInTheDocument()
    expect(screen.queryByText('Last Name *')).toBeInTheDocument()
  })

  it('saves TI Entry on save button click', async () => {
    render(<Provider><Inquiry /></Provider>)
    const TIButton = screen.getByText('T.I. Inquiry')
    userEvent.click(TIButton)
    userEvent.type(screen.getByLabelText('First Name *'), 'firstName')
    userEvent.type(screen.getByLabelText('Last Name *'), 'lastName')
    userEvent.type(screen.getByLabelText('Email'), 'email@email.com')
    userEvent.click(screen.getByText('Save'))
    expect(mockDispatch).toHaveBeenCalledWith(ACTIONS.SUBMIT.SEND())
  })
})
