import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TestProvider as Provider } from '@redux/utils'

import SnS from '..'

const followups = [
  {
    id: '0',
    name: 'DragonBall',
    statuses: [
      {
        id: '1',
        name: 'Goku',
        displayName: 'Goku',
        schedules: [
          {
            autoEnabled: false,
            clubId: 659,
            daysTillNext: 2,
            followUpSeqNum: 1,
            dayNum: 2,
            followUpStatus: 11,
            followUpType: 1,
            canEditSchedules: false,
            scripts: [
              {
                actionType: 1,
                clubId: 659,
                followUpSeqNum: 1,
                followUpStatus: 11,
                followUpType: 1,
                script: 'Hi'
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'Vegeta'
      },
      {
        id: '3',
        name: 'Gohan'
      },
      {
        id: '4',
        name: 'Piccolo'
      }
    ]
  },
  {
    id: '1',
    name: 'Naruto',
    statuses: [
      {
        id: '1',
        name: 'Sasuke',
        schedules: [
          {
            autoEnabled: false,
            clubId: 659,
            daysTillNext: 2,
            followUpSeqNum: 1,
            dayNum: 2,
            followUpStatus: 11,
            followUpType: 1,
            canEditSchedules: true,
            scripts: [
              {
                actionType: 1,
                clubId: 659,
                followUpSeqNum: 1,
                followUpStatus: 11,
                followUpType: 1,
                script: 'Hi'
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name: 'Kakashi'
      },
      {
        id: '3',
        name: 'Itachi'
      },
      {
        id: '4',
        name: 'Sakura'
      }
    ]
  },
  {
    id: '2',
    name: 'One Piece',
    statuses: [
      {
        id: '1',
        name: 'Monkey D. Luffy'
      },
      {
        id: '2',
        name: 'Nami'
      },
      {
        id: '3',
        name: 'Usopp'
      },
      {
        id: '4',
        name: 'Chopper'
      },
      {
        id: '5',
        name: 'Franky'
      }
    ]
  }
]

const scheduleNScripts = {
  loading: false,
  error: '',
  followups,
  canEditSchedules: true,
  canEditScripts: true
}

describe('<ScheduleAndScripts />', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <SnS />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  describe('Editable', () => {
    it('has scheduels editables', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({ scheduleNScripts }))
      render(<Provider><SnS /></Provider>)
      const icon = screen.getByText('Schedules are editable').nextElementSibling
      expect(icon).toHaveClass('text-success')
      const icons = screen.queryAllByLabelText('BsCheckLg')
      expect(icons).toContainEqual(icon)
    })

    it('has scripts editables', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({ scheduleNScripts }))
      render(<Provider><SnS /></Provider>)
      const icon = screen.getByText('Scripts are editable').nextElementSibling
      expect(icon).toHaveClass('text-success')

      const icons = screen.queryAllByLabelText('BsCheckLg')
      expect(icons).toContainEqual(icon)
    })

    it('does not have schedules editable', () => {
      const state = {
        scheduleNScripts: {
          ...scheduleNScripts,
          canEditSchedules: false
        }
      }

      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(state))
      render(<Provider><SnS /></Provider>)
      const icon = screen.getByText('Schedules are editable').nextElementSibling
      expect(icon).toHaveClass('text-danger')

      const icons = screen.queryAllByLabelText('BsXLg')
      expect(icons).toContainEqual(icon)
    })

    it('does not have scripts editables', () => {
      const state = {
        scheduleNScripts: {
          ...scheduleNScripts,
          canEditScripts: false
        }
      }

      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(state))
      render(<Provider><SnS /></Provider>)
      const icon = screen.getByText('Scripts are editable').nextElementSibling
      expect(icon).toHaveClass('text-danger')

      const icons = screen.queryAllByLabelText('BsXLg')
      expect(icons).toContainEqual(icon)
    })
  })

  it('renders all tabs', () => {
    render(<Provider><SnS /></Provider>)

    followups.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
  })

  it('renders all tabs', () => {
    render(<Provider><SnS /></Provider>)

    followups.forEach(({ name }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
    })
    expect(screen.getByText('Schedules are editable')).toBeInTheDocument()
    userEvent.click(screen.getByText('Naruto'))
    expect(screen.getByText('Schedules are editable').nextElementSibling).toHaveClass('text-success')
  })

  it('renders error', () => {
    const sns = {
      ...scheduleNScripts,
      error: 'Error here'
    }
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({ scheduleNScripts: sns }))
    render(<Provider><SnS /></Provider>)

    expect(screen.getByText('Error here')).toBeInTheDocument()
  })
})
