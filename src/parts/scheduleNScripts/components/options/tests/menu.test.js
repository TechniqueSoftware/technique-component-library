import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import { TestProvider as Provider } from '@redux/utils'

import { TP_OPTIONS } from '../../../redux'
import { TP_ACTION_TYPES } from '../../../constants'
import Menu from '..'

const mockDispatch = jest.fn()
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)

describe('<New />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
      scheduleNScripts: {
        touchpointCrud: {
          action: TP_OPTIONS.MENU,
          data: { displayName: 'Some status here' }
        }
      }
    }))
    const { asFragment } = render(
      <Provider>
        <Menu />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  describe('New Touchpoint', () => {
    beforeAll(() => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: {
          touchpointCrud: {
            action: TP_OPTIONS.NEW,
            data: { displayName: 'Some status here' }
          }
        }
      }))
    })

    it('renders title', () => {
      render(
        <Provider>
          <Menu />
        </Provider>
      )

      expect(screen.getByText('Touchpoint:')).toBeInTheDocument()
      expect(screen.getByText('Some status here')).toBeInTheDocument()
    })

    it('renders content', () => {
      render(
        <Provider>
          <Menu />
        </Provider>
      )

      expect(screen.getByText('Immediate')).toBeInTheDocument()
    })
  })

  describe('Edit Schedule', () => {
    beforeAll(() => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: {
          touchpointCrud: {
            action: TP_OPTIONS.EDIT,
            data: {
              followUpSeqNum: 1,
              daysTillNext: 3,
              displayName: 'Day 4'
            }
          }
        }
      }))
    })

    it('renders content', () => {
      render(
        <Provider>
          <Menu />
        </Provider>
      )

      expect(screen.queryByText('Touchpoint:')).toBeInTheDocument()
      expect(screen.getByText('Day 4')).toBeInTheDocument()
      expect(screen.queryByText('Save')).toBeInTheDocument()
    })
  })

  describe('Edit Touchpoint', () => {
    beforeAll(() => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: {
          touchpointCrud: {
            action: TP_OPTIONS.MENU,
            data: {
              followUpSeqNum: 1,
              daysTillNext: 3,
              rowName: 'Web Lead',
              displayName: 'Day 4'
            }
          }
        }
      }))
    })

    it('renders title', () => {
      render(
        <Provider>
          <Menu />
        </Provider>
      )

      expect(screen.queryByText('Edit:')).toBeInTheDocument()
      expect(screen.getByText('Web Lead Day 4')).toBeInTheDocument()
    })
  })

  describe('Render model windows', () => {
    beforeAll(() => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
        scheduleNScripts: {
          touchpointCrud: {
            action: TP_ACTION_TYPES.CALL,
            data: {
              followUpSeqNum: 1,
              daysTillNext: 3,
              rowName: 'Web Lead',
              displayName: 'Day 4',
              scripts: []
            }
          }
        }
      }))
    })

    it('renders Configure Follow Up', () => {
      render(
        <Provider>
          <Menu />
        </Provider>
      )
      expect(screen.queryByText('Configure Follow Up Contact')).toBeInTheDocument()
    })
  })
})
