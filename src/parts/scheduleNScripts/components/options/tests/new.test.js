import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TestProvider as Provider } from '@redux/utils'

import { ACTIONS } from '../../../redux'

import New from '../new'

const mockDispatch = jest.fn()
const setHasCloseButton = jest.fn()
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)

describe('<New />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <New followUpSeqNum={1} dayNum={1} />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders options', () => {
    render(
      <Provider>
        <New />
      </Provider>
    )
    expect(screen.queryByText('Immediate')).toBeInTheDocument()
    expect(screen.queryByText('Day')).toBeInTheDocument()
    expect(screen.getByRole('spinbutton')).toBeInTheDocument()

    expect(screen.queryByText('Last')).not.toBeInTheDocument()
    expect(screen.queryByText('First')).not.toBeInTheDocument()
  })

  describe('creates new day', () => {
    it('creates new day', () => {
      render(
        <Provider>
          <New />
        </Provider>
      )

      userEvent.click(screen.queryByText('Day'))
      userEvent.type(screen.getByRole('spinbutton'), '12')
      userEvent.click(screen.getByText('Save'))

      expect(mockDispatch).toHaveBeenCalledWith(
        ACTIONS.TOUCHPOINT.NEW({
          dayNum: 12
        })
      )
    })

    it('shows options if same day exists', () => {
      render(
        <Provider>
          <New tpDays={['3']} setHasCloseButton={setHasCloseButton} />
        </Provider>
      )

      userEvent.click(screen.queryByText('Day'))
      userEvent.type(screen.getByRole('spinbutton'), '3')
      userEvent.click(screen.getByText('Save'))

      expect(mockDispatch).toHaveBeenCalled()

      expect(setHasCloseButton).toHaveBeenCalledTimes(1)

      expect(screen.getByText('Last')).toBeInTheDocument()
      expect(screen.getByText('First')).toBeInTheDocument()
    })

    it('creates existing as first', () => {
      render(
        <Provider>
          <New tpDays={['3']} edit setHasCloseButton={setHasCloseButton} />
        </Provider>
      )

      userEvent.click(screen.queryByText('Day'))
      userEvent.type(screen.getByRole('spinbutton'), '3')
      userEvent.click(screen.getByText('Save'))
      userEvent.click(screen.getByText('First'))

      expect(mockDispatch).toHaveBeenCalledWith(
        ACTIONS.TOUCHPOINT.EDIT_TOUCHPOINT({
          dayNum: 3,
          order: 'first'
        })
      )

      expect(setHasCloseButton).toHaveBeenCalled()
    })

    it('creates existing as last', () => {
      render(
        <Provider>
          <New tpDays={['3']} setHasCloseButton={setHasCloseButton} />
        </Provider>
      )

      userEvent.click(screen.queryByText('Day'))
      userEvent.type(screen.getByRole('spinbutton'), '3')
      userEvent.click(screen.getByText('Save'))
      userEvent.click(screen.getByText('Last'))

      expect(mockDispatch).toHaveBeenCalledWith(
        ACTIONS.TOUCHPOINT.NEW({
          dayNum: 3
        })
      )

      expect(setHasCloseButton).toHaveBeenCalledTimes(2)
    })
  })
})
