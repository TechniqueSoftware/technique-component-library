import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'

import { TestProvider as Provider } from '@redux/utils'
import userEvent from '@testing-library/user-event'
import ManageTags from '..'

import { state, mockData } from './redux/mock'
import { ACTIONS } from '../redux'

jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(state))
const mockDispatch = jest.fn()
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)

describe('<ManageTags/>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Provider><ManageTags /></Provider>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the modal button', () => {
    render(<Provider><ManageTags /></Provider>)
    const Managetags = screen.getByText('Manage Tags')
    expect(Managetags).toBeInTheDocument()
  })

  it('opens modal', () => {
    render(<Provider><ManageTags /></Provider>)
    const Managetags = screen.getByText('Manage Tags')
    expect(Managetags).toBeInTheDocument()
    expect(screen.queryByText('Save')).not.toBeInTheDocument()
    userEvent.click(Managetags)
    expect(screen.queryByText('Save')).toBeInTheDocument()
    expect(screen.queryByText('Delete')).toBeInTheDocument()
  })

  it('select all tags', () => {
    render(<Provider><ManageTags /></Provider>)
    const Managetags = screen.getByText('Manage Tags')
    expect(Managetags).toBeInTheDocument()
    expect(screen.queryByText('Select all')).not.toBeInTheDocument()
    userEvent.click(Managetags)
    expect(screen.queryByText('Select all')).toBeInTheDocument()
    userEvent.click(screen.getByText('Select all'))
  })

  it('unselect all tags', () => {
    render(<Provider><ManageTags /></Provider>)
    const Managetags = screen.getByText('Manage Tags')
    expect(Managetags).toBeInTheDocument()
    expect(screen.queryByText('Select all')).not.toBeInTheDocument()
    userEvent.click(Managetags)
    expect(screen.queryByText('Select all')).toBeInTheDocument()
    userEvent.click(screen.getByText('Select all'))
    userEvent.click(screen.getByText('None'))
  })

  it('saves new tag on save button click', async () => {
    render(<Provider><ManageTags /></Provider>)
    const Managetags = screen.getByText('Manage Tags')
    userEvent.click(Managetags)
    userEvent.type(screen.getByPlaceholderText('Add a new tag'), mockData.newTagValue)
    userEvent.click(screen.getByText('Save'))
    // eslint-disable-next-line max-len
    expect(mockDispatch).toHaveBeenCalledWith(ACTIONS.DATA.SAVE_TAGS({ ...mockData.location, newTagValue: mockData.newTagValue }))
  })
})
