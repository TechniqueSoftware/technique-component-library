import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TestProvider as Provider } from '@redux/utils'
import { GLOBAL_ACTIONS } from '@redux/global'

import { locations, state } from './mock'

import LocationSelect from '..'
import { getLocationIdFromUrl } from '../utils'

const defaultState = {
  global: {
    ...state.global,
    club: { name: 'Club OS QA', id: 659 },
    selectedLocation: {
      name: 'Club OS QA',
      value: 659,
      clubId: 659,
      isClub: true
    }
  }
}

const newLocation = {
  locationName: 'Philadelphia, PA',
  locationId: 4559,
  name: 'Philadelphia, PA',
  value: '4559'
}

const mockDispatch = jest.fn()
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)
jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(state))

describe('<LocationSelect>', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <LocationSelect />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders', () => {
    render(
      <Provider>
        <LocationSelect />
      </Provider>
    )
    expect(screen.queryByRole('combobox')).toBeInTheDocument()
  })

  it('selects an option', async () => {
    render(
      <Provider>
        <LocationSelect />
      </Provider>
    )
    const select = screen.getByRole('combobox')

    const option = locations[3]

    await userEvent.selectOptions(select, [`${option.locationId}`])

    const s = {
      ...option,
      name: option.locationName,
      value: `${option.locationId}`
    }
    expect(mockDispatch).toHaveBeenCalledWith(GLOBAL_ACTIONS.LOCATIONS.SELECT(s))
  })

  describe('called with Redirect', () => {
    const basePath = 'http://www.example.com/technique-web/action/ClubSettings/followup/scheduleAndScripts'

    it('sets location from url', () => {
      delete window.location
      window.location = new URL(`${basePath}/659/4559#`)
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(defaultState))
      render(
        <Provider>
          <LocationSelect withRedirect />
        </Provider>
      )

      expect(mockDispatch).toHaveBeenCalledWith(GLOBAL_ACTIONS.LOCATIONS.SELECT(newLocation))
    })

    it('does not club from url if restricted admin', () => {
      delete window.location
      window.location = new URL(`${basePath}/659`)
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(defaultState))
      render(
        <Provider>
          <LocationSelect withRedirect />
        </Provider>
      )

      expect(mockDispatch).not.toHaveBeenCalledWith()
    })

    it('sets club from url if unrestricted admin', () => {
      delete window.location
      window.location = new URL(`${basePath}/659`)
      const updatedState = { ...defaultState, global: { ...defaultState.global, user: { unrestrictedAdmin: true } } }
      jest
        .spyOn(redux, 'useSelector')
        .mockImplementation(cb => cb(updatedState)
        )
      render(
        <Provider>
          <LocationSelect withRedirect />
        </Provider>
      )

      expect(mockDispatch).toHaveBeenCalledWith(GLOBAL_ACTIONS.LOCATIONS.SELECT(defaultState.global.selectedLocation))
    })
  })

  describe('utils', () => {
    it('getLocationIdFromUrl returns current location id', () => {
      const mockedPath1 = '/technique-web/action/ClubSettings/followup/scheduleAndScripts/659/4559'
      expect(getLocationIdFromUrl(mockedPath1, 659)).toBe(4559)

      const mockedPath2 = '/technique-web/action/ClubSettings/followup/scheduleAndScripts/659/4559#'
      expect(getLocationIdFromUrl(mockedPath2, 659)).toBe(4559)

      const mockedPath3 = '/technique-web/action/ClubSettings/followup/scheduleAndScripts/659/4559/#'
      expect(getLocationIdFromUrl(mockedPath3, 659)).toBe(4559)

      const mockedPath4 = '/technique-web/action/ClubSettings/followup/scheduleAndScripts/659/asdsdsa'
      expect(getLocationIdFromUrl(mockedPath4, 659)).toBe(null)
    })
  })
})
