import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TestProvider as Provider } from '@redux/utils'

import { truncate } from 'lodash'
import { schedules } from './mock'

import { ACTIONS, TP_OPTIONS } from '../../redux'

import StatusSchedules from '../../statusSchedules'

const state = {
  global: {},
  scheduleNScripts: {
    innerPermissions: {
      followUpSegmentsAction: true
    }
  }
}

const mockDispatch = jest.fn()
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)

describe('Schedule and scripts <StatusSchedules />', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <StatusSchedules />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders title', () => {
    render(
      <Provider>
        <StatusSchedules displayName='Something' />
      </Provider>
    )
    expect(screen.getByText('Something')).toBeInTheDocument()
  })

  it('renders hidden row', () => {
    render(
      <Provider>
        <StatusSchedules displayName='Something' hidden='true' />
      </Provider>
    )
    expect(screen.queryByText(
      'Hidden from dashboard and search filters'
    )).toBeInTheDocument()
  })

  it('renders touchpoints', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
      scheduleNScripts: {
        canEditSchedules: true
      }
    }))
    render(
      <Provider>
        <StatusSchedules displayName='Test' hidden='false' schedules={schedules} />
      </Provider>
    )
    const row = screen.getByText('Test').parentNode.parentNode
    expect(row.childElementCount).toEqual(schedules.length + 2)
    for (let i = 1; i < row.childElementCount - 1; i++) {
      expect(row.children[i]).toHaveClass('touchpoint')
      expect(row.children[i]).toHaveClass('filled')
    }
    expect(screen.queryByText('New touchpoint')).toBeInTheDocument()
  })

  it('renders "No Touchpoints"', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
      scheduleNScripts: {
        canEditSchedules: true
      }
    }))
    const props = {
      hidden: 'false'
    }

    render(
      <Provider>
        <StatusSchedules displayName='Test' {...props} />
      </Provider>
    )
    const row = screen.getByText('Test').parentNode.parentNode
    expect(row.childElementCount).toEqual(3)
    expect(row.children[1]).toHaveClass('touchpoint')
    expect(row.children[1]).toHaveClass('empty')
    expect(screen.queryByText('New touchpoint')).toBeInTheDocument()
  })

  it('renders manage segment button link', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(state))
    const props = {
      id: '11',
      displayName: 'Show this',
      schedules: [],
      type: 1,
      hidden: 'false'
    }
    render(
      <Provider>
        <StatusSchedules {...props} />
      </Provider>
    )
    expect(screen.queryByText('Manage Segments')).toBeInTheDocument()
  })

  it('does not render manage segment button link', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
      ...state,
      scheduleNScripts: {
        innerPermissions: {
          followUpSegmentsAction: false
        }
      }
    })
    )
    const props = {
      id: '11',
      displayName: 'Show this',
      schedules: [],
      type: 1,
      hidden: 'false'
    }
    render(
      <Provider>
        <StatusSchedules {...props} />
      </Provider>
    )
    expect(screen.queryByText('Manage Segments')).not.toBeInTheDocument()
  })

  describe('New touchpoint', () => {
    it('does not render', () => {
      render(
        <Provider>
          <StatusSchedules />
        </Provider>
      )
      expect(screen.queryByText('New touchpoint')).not.toBeInTheDocument()
    })

    it('creates new touchpoint', () => {
      const props = {
        id: 1,
        displayName: 'Show this',
        schedules: [],
        type: 2,
        hidden: 'false'
      }
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: {
          canEditSchedules: truncate
        }
      }))
      render(
        <Provider>
          <StatusSchedules {...props} />
        </Provider>
      )
      const newTp = screen.queryByText('New touchpoint')
      expect(newTp).toBeInTheDocument()
      userEvent.click(newTp)

      expect(mockDispatch).toHaveBeenCalledWith(
        ACTIONS.TOUCHPOINT.OPEN({
          action: TP_OPTIONS.NEW,
          data: {
            displayName: props.displayName,
            id: props.id,
            tpDays: [],
            type: props.type
          }
        })
      )
    })
  })
})
