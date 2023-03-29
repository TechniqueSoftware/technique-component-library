import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import { TestProvider as Provider } from '@redux/utils'
import userEvent from '@testing-library/user-event'
import ScriptBody from '../script/scriptBody'
import { ACTIONS } from '../../../redux'

const mockScripts1 = [
  {
    actionType: 1,
    clubId: 659,
    followUpSeqNum: 5,
    followUpStatus: 6,
    followUpType: 1,
    script: '<p>This is a call test script</p>'
  }
]

const mockScripts2 = [
  {
    actionType: 2,
    emailSubject: '',
    clubId: 659,
    followUpSeqNum: 5,
    followUpStatus: 6,
    followUpType: 1,
    locationId: undefined,
    script: '<p>This is an email test script</p>'
  },
  {
    actionType: 3,
    clubId: 659,
    followUpSeqNum: 5,
    followUpStatus: 6,
    followUpType: 1,
    locationId: undefined,
    script: '<p>This is an text test script</p>'
  }
]

const data = {
  autoEnabled: false,
  clubId: 659,
  daysTillNext: 72,
  dayNum: 166,
  followUpSeqNum: 5,
  followUpStatus: 6,
  followUpType: 1,
  rowName: 'Member',
  locationId: undefined,
  scripts: mockScripts1
}

const props = {
  actionType: 1,
  dataSchedule: {
    followUpTime: '21:12:00',
    primaryAction: 3,
    secondaryAction: 2
  },
  tabId: 1,
  dynamicTags: [{
    name: 'Recipient',
    options: [{
      name: 'First Name',
      value: '{{recipient-first}}'
    },
    {
      name: 'Last Name',
      value: '{{recipient-last}}'
    }]
  }],
  scriptsToSave: mockScripts1,
  setScriptsToSave: jest.fn(),
  setValidMinute: jest.fn()
}

const mockDispatch = jest.fn()
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)
jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
  scheduleNScripts: {
    canEditScripts: true,
    touchpointCrud: { data: { ...data, scripts: mockScripts1 },
      action: props.actionType }
  }
}))

describe('<ScriptBody />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <ScriptBody {...props} />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders tab content', () => {
    render(
      <Provider>
        <ScriptBody {...props} />
      </Provider>
    )
    expect(screen.queryByText('Add Dynamic Content')).toBeInTheDocument()
    expect(screen.queryByText('Follow-Up Script: Member Day 166')).toBeInTheDocument()
    expect(screen.queryByText('Email Subject')).toBeNull()
    expect(screen.queryByText('Save')).toBeInTheDocument()
  })

  it('Click the save button to send data', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
      scheduleNScripts: { canEditScripts: true, touchpointCrud: { data, action: props.actionType } }
    })
    )
    const updatedProps = { ...props, scriptsToSave: mockScripts2 }
    render(
      <Provider>
        <ScriptBody {...updatedProps} />
      </Provider>
    )
    expect(screen.queryByText('Save')).toBeInTheDocument()
    userEvent.click(screen.queryByText('Save'))
    expect(mockDispatch).toHaveBeenCalledWith(
      ACTIONS.SCRIPTS.SAVE({
        scriptsToSave: mockScripts2,
        followUpSchedule: {
          clubId: 659,
          autoEnabled: false,
          locationId: undefined,
          daysTillNext: 72,
          followUpSeqNum: 5,
          followUpStatus: 6,
          followUpType: 1
        }
      })
    )
  })

  it('Click the save button and failed on minute valiation', () => {
    const updatedProps = { ...props,
      dataSchedule: { ...props.dataSchedule, followUpMinutes: 11111111 } }
    render(
      <Provider>
        <ScriptBody {...updatedProps} />
      </Provider>
    )
    expect(screen.queryByText('Save')).toBeInTheDocument()
    userEvent.click(screen.queryByText('Save'))
    expect(props.setValidMinute).toHaveBeenCalledWith(false)
    expect(mockDispatch).toHaveBeenCalledTimes(0)
  })
  it('Click the Cancel button', () => {
    render(
      <Provider>
        <ScriptBody {...props} />
      </Provider>
    )
    expect(screen.queryByText('Cancel')).toBeInTheDocument()
    userEvent.click(screen.queryByText('Cancel'))
    expect(mockDispatch).toHaveBeenCalledWith(
      ACTIONS.TOUCHPOINT.CLOSE()
    )
  })

  it('Update subject', () => {
    const updatedProps = { ...props, actionType: 2 }
    render(
      <Provider>
        <ScriptBody {...updatedProps} />
      </Provider>
    )
    const emailSubject = screen.queryByLabelText('Email Subject')
    expect(emailSubject).toBeInTheDocument()
    userEvent.type(emailSubject, 't')
    expect(emailSubject.value).toBe('t')
  })

  it('change dynamic tags', async () => {
    render(
      <Provider>
        <ScriptBody {...props} />
      </Provider>
    )
    const selectBox = screen.getByLabelText('Add Dynamic Content')
    expect(selectBox).toBeInTheDocument()
    const options = screen.getAllByRole('option')

    expect(options[0].selected).toBeTruthy()
    expect(options[1].selected).toBeFalsy()
    await userEvent.selectOptions(selectBox, ['{{recipient-last}}'])
    expect(options[1].selected).toBeTruthy()
  })

  it('does not render or disable specific content if canEditScripts is false', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
      scheduleNScripts: { canEditScripts: false, touchpointCrud: { data, action: 2 } }
    }))
    const updatedProps = { ...props, actionType: 2 }
    render(
      <Provider>
        <ScriptBody {...updatedProps} />
      </Provider>
    )
    expect(screen.queryByText('Save')).not.toBeInTheDocument()
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument()
    const emailSubject = screen.queryByLabelText('Email Subject')
    expect(emailSubject).toBeInTheDocument()
    expect(emailSubject).toBeDisabled()
    const tagsSelect = screen.getByLabelText('Add Dynamic Content')
    expect(tagsSelect).toBeInTheDocument()
    expect(tagsSelect).toBeDisabled()
  })
})
