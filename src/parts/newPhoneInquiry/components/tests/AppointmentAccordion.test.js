import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TestProvider as Provider } from '@redux/utils'

import { ACTIONS } from '../../redux'

import AppointmentAccordion from '../AppointmentAccordion'

const state = {
  global: {
    user: {
      clubId: 659,
      userId: 136951500
    }
  },
  newPhoneInquiry: {
    form: {
      locationSelect: {
        type: 'select',
        label: 'Location',
        value: {
          name: 'Austin, TX',
          value: '1974',
          timeZone: 'America/Chicago'
        },
        error: '',
        required: true,
        validated: true
      },
      date: {
        type: 'date',
        label: 'Date',
        value: '1974-06-02',
        error: '',
        validated: true
      },
      contact: {
        type: 'select',
        label: 'With',
        value: {
          name: 'M. Rodriguez',
          value: 'M. Rodriguez',
          availability: []
        },
        error: '',
        validated: true
      }
    },
    locationEmployees: [
      {
        firstName: 'Tyler',
        lastName: 'Durden',
        userId: 1234,
        availability: []
      },
      {
        firstName: 'Benjamin',
        lastName: 'Button',
        userId: 5678,
        availability: []
      }
    ]
  }
}

const mockDispatch = jest.fn()
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)

describe('<Appointment Accordion/>', () => {
  beforeAll(() => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(state))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('it renders', () => {
    render(
      <Provider>
        <AppointmentAccordion />
      </Provider>
    )
    expect(screen.getByText('Schedule Appointment')).toBeInTheDocument()
  })

  it('it updates the date field', async () => {
    render(
      <Provider>
        <AppointmentAccordion />
      </Provider>
    )

    const date = screen.getByLabelText('Date')
    userEvent.type(date, '2025-01-01')
    expect(mockDispatch).toHaveBeenCalledWith(
      ACTIONS.DATA.SET({
        name: 'date',
        data: {
          value: '2025-01-01',
          error: '',
          validated: true
        }
      })
    )
  })

  it('selects first employee if user is not on the employees list', async () => {
    render(
      <Provider>
        <AppointmentAccordion />
      </Provider>
    )
    const select = screen.getByLabelText('With')
    expect(select).toHaveValue('1234')
  })
})
