import React from 'react'
import * as redux from 'react-redux'
import { render, screen, waitFor } from '@testing-library/react'

import { TestProvider as Provider } from '@redux/utils'

import { ACTIONS } from '@parts/newPhoneInquiry/redux/index.js'
import TILocationSelect from '../TILocationSelect.js'

const locations = [
  { locationId: '001', locationName: 'Option1' },
  { locationId: '002', locationName: 'Option2' },
  { locationId: '4585', locationName: 'Loc 4585' }
]

const state = {
  global: {
    user: {
      locationId: 4585
    },
    locations
  }
}

const mockDispatch = jest.fn()
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)
jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(state))

describe('<TILocationSelect/>', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <TILocationSelect
          name='location'
          required
          disabled
        />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('it renders as disabled', () => {
    render(
      <Provider>
        <TILocationSelect
          name='location'
          required
          disabled
        />
      </Provider>
    )
    expect(screen.getByLabelText('Location')).toBeDisabled()
  })

  it('it renders multiple options and first is selected', () => {
    render(
      <Provider>
        <TILocationSelect name='location' />
      </Provider>
    )
    expect(screen.queryByRole('combobox')).not.toBeDisabled()
    expect(screen.getByText('Option1').selected).toBe(true)
  })

  it('it sets user location as the initial location after rendering', async () => {
    render(
      <Provider>
        <TILocationSelect name='location' />
      </Provider>
    )
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        ACTIONS.DATA.SELECT_LOCATION({
          name: 'locationSelect',
          value: {
            name: locations[2].locationName,
            value: locations[2].locationId
          },
          error: '',
          validated: true
        })
      )
    })
  })

  it('it sets first location as the initial location if there is no user location', async () => {
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation(cb => cb({ ...state, global: { ...state.global, user: { locationId: undefined } } }))
    render(
      <Provider>
        <TILocationSelect name='location' />
      </Provider>
    )
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith(
        ACTIONS.DATA.SELECT_LOCATION({
          name: 'locationSelect',
          value: {
            name: 'Select a location',
            value: ''
          },
          error: '',
          validated: true
        })
      )
    })
  })
})
