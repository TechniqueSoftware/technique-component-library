import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import { TestProvider as Provider } from '@redux/utils'

import userEvent from '@testing-library/user-event'
import AutoFollowUpConfig from '../autoFollowUpConfig'

const data = {
  locationId: 4559,
  primaryAction: 2,
  secondaryAction: 3
}

jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
  global: {
    locations: [
      {
        locationId: 4559,
        locationName: 'Philadelphia, PA'
      }
    ]
  },
  scheduleNScripts: {
    touchpointCrud: {
      data,
      action: 1
    }
  }
})
)

const props = {
  autoOptions: { timePicker: { hour: 12, minute: '00', meridiem: 'PM' }, minute: '' },
  setAutoOptions: jest.fn(),
  isValidMinute: true
}

describe('<AutoFollowUpConfig />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <AutoFollowUpConfig {...props} />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders', () => {
    render(
      <Provider>
        <AutoFollowUpConfig {...props} />
      </Provider>
    )
    expect(screen.queryByText('Preferred contact method')).toBeInTheDocument()
    expect(screen.queryByText('Fall-back contact method')).toBeInTheDocument()
    expect(screen.queryAllByRole('checkbox')).toHaveLength(5)
  })

  it('setting SMS as preferred contact method calls setAutoOptions fn', () => {
    render(
      <Provider>
        <AutoFollowUpConfig {...props} />
      </Provider>
    )
    const smsCheckbox = screen.queryByText('Preferred contact method').nextSibling.firstChild
      .firstChild
    expect(smsCheckbox).toBeInTheDocument()
    expect(smsCheckbox).toHaveTextContent('SMS')
    userEvent.click(smsCheckbox)
    expect(props.setAutoOptions).toBeCalledTimes(1)
  })

  it('renders timepicker if is not immediate', () => {
    render(
      <Provider>
        <AutoFollowUpConfig {...props} />
      </Provider>
    )
    expect(screen.queryByText('Recipient’s Local Time')).toBeInTheDocument()
    expect(screen.queryByText('minutes after status changes')).not.toBeInTheDocument()
  })

  it('renders minutes input if is immediate', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
      global: {
        locations: [
          {
            locationId: 4559,
            locationName: 'Philadelphia, PA'
          }
        ]
      },
      scheduleNScripts: {
        touchpointCrud: {
          data: { ...data, dayNum: 0 },
          action: 1
        }
      }
    })
    )
    render(
      <Provider>
        <AutoFollowUpConfig {...props} />
      </Provider>
    )
    expect(screen.queryByText('minutes after status changes')).toBeInTheDocument()
    expect(screen.queryByText('Recipient’s Local Time')).not.toBeInTheDocument()
  })
})
