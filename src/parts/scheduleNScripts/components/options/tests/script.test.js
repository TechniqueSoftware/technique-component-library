import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import { TestProvider as Provider } from '@redux/utils'
import { data, locationState, dynamicTagState } from './mock'

import Script from '../script'

const props = {
  dataSchedule: {
    followUpTime: '10:00:00',
    primaryAction: 2,
    secondaryAction: 3,
    followUpMinutes: ''
  },
  setValidMinute: jest.fn(),
  followUpToggle: 'auto'
}

const mockDispatch = jest.fn()
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)
jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
  global: {
    locations: locationState,
    dynamicTags: dynamicTagState
  },
  scheduleNScripts: { touchpointCrud: { data, action: 1 } }
}))

describe('<Script />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <Script {...props} />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders tabs', () => {
    render(
      <Provider>
        <Script {...props} />
      </Provider>
    )
    expect(screen.queryByText('Call')).toBeInTheDocument()
    expect(screen.queryByText('Email')).toBeInTheDocument()
    expect(screen.queryByText('Text')).toBeInTheDocument()
  })

  it('render dynamic', () => {
    render(
      <Provider>
        <Script {...props} />
      </Provider>
    )
    expect(screen.getAllByText('Add Dynamic Content')).toHaveLength(3)
  })
})
