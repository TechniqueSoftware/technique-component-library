import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import { TestProvider as Provider } from '@redux/utils'
import userEvent from '@testing-library/user-event'

import FollowUpToggle from '../followUpToggle'

const mockhasAutoFollowUpAsTrue = () => {
  const data = {
    locationId: 4559,
    primaryAction: 2,
    secondaryAction: 3
  }

  const locationState = [{
    locationId: 4559,
    locationName: 'Philadelphia, PA'
  }]

  jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
    global: {
      locations: locationState
    },
    scheduleNScripts: { touchpointCrud: { data, action: 1 } }
  }))
}

const mockhasAutoFollowUpAsFalse = () => {
  const data = {
    locationId: 4559
  }

  const locationState = [{
    locationId: 4559,
    locationName: 'Philadelphia, PA'
  }]

  jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
    global: {
      locations: locationState
    },
    scheduleNScripts: { touchpointCrud: { data, action: 1 } }
  }))
}

const props = {
  followUpToggle: 'manual',
  autoOptions: { timePicker: { hour: 12, minute: '00', meridiem: 'PM' }, minute: '' },
  setAutoOptions: jest.fn(),
  setFollowUpToggle: jest.fn(),
  isValidMinute: true
}

describe('<FollowUpToggle />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    mockhasAutoFollowUpAsTrue()
    const { asFragment } = render(
      <Provider>
        <FollowUpToggle {...props} />
      </Provider>)
    expect(asFragment()).toMatchSnapshot()
  })

  it('Renders both options manual/automatic', () => {
    mockhasAutoFollowUpAsTrue()
    render(
      <Provider>
        <FollowUpToggle {...props} />
      </Provider>)
    expect(screen.queryByText('Manual')).toBeInTheDocument()
    expect(screen.queryByText('Automatic')).toBeInTheDocument()
  })

  it('Renders automatic follow up when is selected', () => {
    mockhasAutoFollowUpAsTrue()
    render(<FollowUpToggle {...props} />)
    const optionSelected = { value: 'auto', name: 'Automatic' }
    const toggleButton = screen.queryAllByRole('radio')[1]
    userEvent.click(toggleButton)
    expect(props.setFollowUpToggle).toHaveBeenCalledWith(optionSelected.value)
  })

  it('Sets automatic if hasAutofollowUp is true', () => {
    mockhasAutoFollowUpAsTrue()
    render(
      <Provider>
        <FollowUpToggle {...props} />
      </Provider>)
    expect(props.setFollowUpToggle).toHaveBeenCalledWith('auto')
  })

  it('Not setting automatic if hasAutofollowUp is false', () => {
    mockhasAutoFollowUpAsFalse()
    render(
      <Provider>
        <FollowUpToggle {...props} />
      </Provider>)
    expect(props.setFollowUpToggle).not.toHaveBeenCalledWith('auto')
  })
}
)
