import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import { TestProvider as Provider } from '@redux/utils'
import userEvent from '@testing-library/user-event'
import { ACTIONS } from '@parts/scheduleNScripts/redux'
import { data, locationState, dynamicTagState, segmentsMock } from './mock'

import Segments from '../segments'

const baseText = 'Recipients who do not meet any segment criteria will receive the default status scripts.'
const noSegmentsMsg = 'No segments have been created.'

const mockDispatch = jest.fn()
const state = {
  global: {
    locations: locationState,
    dynamicTags: dynamicTagState
  },
  scheduleNScripts: {
    canEditSchedules: true,
    canEditScripts: true,
    touchpointCrud: { data, action: 1 },
    segments: segmentsMock,
    segmentModalData: {
      isOpen: true,
      title: 'Web Lead',
      followUpStatus: 11,
      followUpType: 1
    }
  }
}
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)
jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(state))

describe('<Segments />', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <Segments />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders segments list', () => {
    render(
      <Provider>
        <Segments />
      </Provider>
    )
    const attributeTypeText = `${segmentsMock[0].segmentAttributes[0].attributeType}:`
    expect(screen.queryByText(baseText)).toBeInTheDocument()
    expect(screen.queryByText(segmentsMock[0].name)).toBeInTheDocument()
    expect(screen.queryByText(segmentsMock[1].name)).toBeInTheDocument()
    expect(screen.queryAllByText(attributeTypeText)).toHaveLength(2)
    expect(screen.queryByText(noSegmentsMsg)).not.toBeInTheDocument()
  })

  it('displays form when clicking on Add new segment', async () => {
    render(
      <Provider>
        <Segments />
      </Provider>
    )
    expect(screen.queryByLabelText('SaveIcon')).not.toBeInTheDocument()
    const addButton = screen.queryByText('Add new Segment')
    await expect(addButton).toBeInTheDocument()
    await userEvent.click(addButton)
    await expect(screen.queryByLabelText('SaveIcon')).toBeInTheDocument()
    await expect(screen.queryByPlaceholderText('Segment name')).toBeInTheDocument()
  })

  it('displays delete confirmation when clicking on trash', () => {
    render(
      <Provider>
        <Segments />
      </Provider>
    )
    expect(screen.queryByText('Are you sure you want to delete this segment?')).not.toBeInTheDocument()
    const deleteButtons = screen.queryAllByLabelText('BsTrash')
    userEvent.click(deleteButtons[0])
    expect(screen.queryByText('Are you sure you want to delete this segment?')).toBeInTheDocument()
  })

  it('triggers delete on confirmation', () => {
    render(
      <Provider>
        <Segments />
      </Provider>
    )
    userEvent.click(screen.queryAllByLabelText('BsTrash')[0])
    jest.clearAllMocks()
    userEvent.click(screen.getByText('Yes'))
    expect(mockDispatch).toHaveBeenCalledWith(
      ACTIONS.SEGMENTS.DELETE(
        expect.objectContaining({
          segment: segmentsMock[0]
        })
      )
    )
  })

  it('converts readable segment into editable field', () => {
    render(
      <Provider>
        <Segments />
      </Provider>
    )
    expect(screen.queryByPlaceholderText(/segment name/i)).not.toBeInTheDocument()
    const editButtons = screen.queryAllByLabelText('BsPencil')
    userEvent.click(editButtons[1])
    expect(screen.queryByPlaceholderText(/segment name/i)).toBeInTheDocument()
    expect(screen.queryByPlaceholderText(/segment name/i)).toHaveValue(segmentsMock[1].name)
  })

  it('renders no segments message when no segments', () => {
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementation(cb => cb({ ...state, scheduleNScripts: { ...state.scheduleNScripts, segments: [] } })
      )
    render(
      <Provider>
        <Segments />
      </Provider>
    )
    expect(screen.queryByText(baseText)).toBeInTheDocument()
    expect(screen.queryByText(segmentsMock[0].name)).not.toBeInTheDocument()
    expect(screen.queryByText(noSegmentsMsg)).toBeInTheDocument()
  })
})
