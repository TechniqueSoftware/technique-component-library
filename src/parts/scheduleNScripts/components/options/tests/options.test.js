import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TestProvider as Provider } from '@redux/utils'

import { ACTIONS } from '../../../redux'

import Options from '../options'

const mockDispatch = jest.fn()
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)

describe('<Options />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <Options />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  describe('Edit schedule', () => {
    it('renders button', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: { canEditSchedules: true }
      }))

      render(
        <Provider>
          <Options />
        </Provider>
      )
      expect(screen.queryByText('Edit Schedule')).toBeInTheDocument()
    })

    it('does not renders button if canEditSchedule is false', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: { canEditSchedules: false }
      }))

      render(
        <Provider>
          <Options />
        </Provider>
      )
      expect(screen.queryByText('Edit Schedule')).not.toBeInTheDocument()
    })

    it('calls edit action', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: { canEditSchedules: true }
      }))

      render(
        <Provider>
          <Options />
        </Provider>
      )

      userEvent.click(screen.getByText('Edit Schedule'))
      expect(mockDispatch).toHaveBeenCalledWith(ACTIONS.TOUCHPOINT.EDIT())
    })
  })

  describe('Edit scripts', () => {
    it('renders button', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: { canEditScripts: true }
      }))

      render(
        <Provider>
          <Options />
        </Provider>
      )
      expect(screen.queryByText('Edit Scripts')).toBeInTheDocument()
    })

    it('does not renders button if canEditScripts is false', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: { canEditScripts: false }
      }))

      render(
        <Provider>
          <Options />
        </Provider>
      )
      expect(screen.queryByText('Edit Scripts')).not.toBeInTheDocument()
    })

    it('calls edit action', async () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: { canEditScripts: true }
      }))
      const baseProps = {
        handleScript: jest.fn()
      }

      render(
        <Provider>
          <Options {...baseProps} />
        </Provider>
      )

      userEvent.click(screen.getByText('Edit Scripts'))
      expect(baseProps.handleScript).toHaveBeenCalledTimes(1)
    })
  })

  describe('Delete schedule', () => {
    it('renders button', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: { canEditSchedules: true }
      }))
      render(
        <Provider>
          <Options />
        </Provider>
      )
      expect(screen.getByText('Delete Schedule')).toBeInTheDocument()
    })

    it('does not renders button if canEditSchedules is false', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: { canEditSchedules: false }
      }))
      render(
        <Provider>
          <Options />
        </Provider>
      )
      expect(screen.queryByText('Delete Schedule')).not.toBeInTheDocument()
    })

    it('handles delete confirmation modal', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: { canEditSchedules: true }
      }))
      render(
        <Provider>
          <Options />
        </Provider>
      )

      userEvent.click(screen.getByText('Delete Schedule'))
      expect(screen.getByText('Cancel')).toBeInTheDocument()
      expect(screen.getByText('Ok')).toBeInTheDocument()
      userEvent.click(screen.getByText('Cancel'))
      expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
      expect(screen.queryByText('Ok')).not.toBeInTheDocument()
    })

    it('calls delete action', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: { canEditSchedules: true }
      }))
      render(
        <Provider>
          <Options />
        </Provider>
      )

      userEvent.click(screen.getByText('Delete Schedule'))
      userEvent.click(screen.getByText('Ok'))
      expect(mockDispatch).toHaveBeenCalledWith(
        ACTIONS.TOUCHPOINT.DELETE())
    })
  })
})
