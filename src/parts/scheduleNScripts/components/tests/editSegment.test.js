import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import { TestProvider as Provider } from '@redux/utils'
import userEvent from '@testing-library/user-event'
import { ACTIONS } from '@parts/scheduleNScripts/redux'
import { data, locationState, dynamicTagState, segmentsMock } from './mock'
import EditSegment from '../segments/editSegment'
import Segments from '../segments'

const WARNING_TEXT = 'Attention! All users in this segment will be recalculated based on date they entered the status and placed in the status touchpoint that corresponds most closely to their created date.' //eslint-disable-line

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
    segmentAttributes: {
      marketing: ['Marketing-1'],
      membership: ['Member-1']
    },
    segmentModalData: {
      isOpen: true,
      title: '',
      followUpStatus: 6,
      followUpType: 1
    }
  }
}

const fn = jest.fn()
const mockDispatch = fn
jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch)
jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(state))

const props = {
  handleClose: fn,
  setSegmentCrud: fn,
  segmentCrud: { name: { value: '' }, selectedAttributes: [{ name: 'Select', value: '' }] }
}

describe('<EditSegment />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <EditSegment {...props} />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders', () => {
    render(
      <Provider>
        <EditSegment {...props} />
      </Provider>
    )
    expect(screen.queryByLabelText('SaveIcon')).toBeInTheDocument()
    expect(screen.queryByLabelText('BsTrash')).toBeInTheDocument()
    expect(screen.queryByLabelText('BsPlusCircle')).toBeInTheDocument()
    expect(screen.queryByPlaceholderText('Segment name')).toBeInTheDocument()
  })

  it('closes when clicking trash button', () => {
    render(
      <Provider>
        <EditSegment {...props} />
      </Provider>
    )
    userEvent.click(screen.getByLabelText('BsTrash'))
    expect(props.handleClose).toHaveBeenCalled()
  })

  it('saves when clicking save button', () => {
    const updatedProps = {
      ...props,
      segmentCrud: {
        name: { value: 'Segment Test' },
        selectedAttributes: [{ name: 'Member-1', value: 'Member-1' }],
        followUpStatus: 6,
        followUpType: 1
      }
    }
    render(
      <Provider>
        <EditSegment {...updatedProps} />
      </Provider>
    )
    const input = screen.getByPlaceholderText(/segment name/i)
    expect(input).toHaveValue(updatedProps.segmentCrud.name.value)
    userEvent.click(screen.queryByLabelText('SaveIcon'))
    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith(
      ACTIONS.SEGMENTS.SAVE({
        onSave: updatedProps.handleClose,
        segmentName: 'Segment Test',
        segmentAttributes: [{ attributeValue: 'Member-1', attributeType: 'Membership Type' }],
        followUpStatus: 6,
        followUpType: 1
      })
    )
  })

  it('triggers recalculation warning if an attribute is removed', () => {
    const updatedProps = {
      ...props,
      initialAttributes: [{ name: 'Att-1', value: 'Att-1' }, { name: 'Att-2', value: 'Att-2' }],
      segmentCrud: {
        name: { value: 'Segment Test' },
        selectedAttributes: [{ name: 'Att-1', value: 'Att-1' }],
        followUpStatus: 6,
        followUpType: 1
      }
    }
    render(
      <Provider>
        <EditSegment {...updatedProps} />
      </Provider>
    )
    expect(screen.queryByText(WARNING_TEXT)).not.toBeInTheDocument()
    const input = screen.getByPlaceholderText(/segment name/i)
    expect(input).toHaveValue(updatedProps.segmentCrud.name.value)
    userEvent.click(screen.queryByLabelText('SaveIcon'))
    expect(mockDispatch).not.toHaveBeenCalled()
    expect(screen.queryByText(WARNING_TEXT)).toBeInTheDocument()
  })

  it('does not save if repeated attributes', () => {
    const updatedProps = {
      ...props,
      segmentCrud: {
        name: { value: 'Segment Test' },
        selectedAttributes: [
          { name: 'Member-1', value: 'Member-1' },
          { name: 'Member-1', value: 'Member-1', error: 'Membership Type is already in use!' }
        ]
      }
    }
    render(
      <Provider>
        <EditSegment {...updatedProps} />
      </Provider>
    )
    const input = screen.getByPlaceholderText(/segment name/i)
    expect(input).toHaveValue(updatedProps.segmentCrud.name.value)
    userEvent.click(screen.queryByLabelText('SaveIcon'))
    expect(mockDispatch).not.toHaveBeenCalled()
  })

  it('calls setSegmentCrud when typing on input', () => {
    render(
      <Provider>
        <EditSegment {...props} />
      </Provider>
    )
    const input = screen.getByPlaceholderText(/segment name/i)
    userEvent.type(input, 't')
    expect(props.setSegmentCrud).toHaveBeenCalled()
  })

  it('adds attribute dropdown if selected attributes', () => {
    render(
      <Provider>
        <Segments />
      </Provider>
    )
    userEvent.click(screen.getByText(/add new segment/i))
    expect(screen.getAllByRole('combobox')).toHaveLength(1)
    userEvent.selectOptions(screen.getAllByRole('combobox')[0], 'Member-1')
    userEvent.click(screen.queryByLabelText('BsPlusCircle'))
    expect(screen.getAllByRole('combobox')).toHaveLength(2)
  })

  it('does not add attribute dropdown if no selected attributes', () => {
    render(
      <Provider>
        <Segments />
      </Provider>
    )
    userEvent.click(screen.getByText(/add new segment/i))
    expect(screen.getAllByRole('combobox')).toHaveLength(1)
    userEvent.click(screen.queryByLabelText('BsPlusCircle'))
    expect(screen.getAllByRole('combobox')).toHaveLength(1)
  })

  it('calls setSegmentCrud when selecting an option from dropdown', async () => {
    render(
      <Provider>
        <EditSegment {...props} />
      </Provider>
    )
    const select = screen.getAllByRole('combobox')[0]
    await userEvent.selectOptions(select, 'Member-1')
    expect(props.setSegmentCrud).toHaveBeenCalledWith('selectedAttributes', [
      { name: 'Member-1', value: 'Member-1', validated: true, error: '' }
    ])
  })

  it('displays Membership Type attributes label when is member', () => {
    render(
      <Provider>
        <EditSegment {...props} />
      </Provider>
    )
    expect(screen.queryByText('Membership Type')).toBeInTheDocument()
    expect(screen.queryByText('Marketing Source')).not.toBeInTheDocument()
  })

  it('displays Marketing Source attributes label when is prospect', () => {
    const state2 = {
      ...state,
      scheduleNScripts: {
        ...state.scheduleNScripts,
        segmentModalData: {
          isOpen: true,
          followUpStatus: 2,
          followUpType: 1
        }
      }
    }
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(state2))
    render(
      <Provider>
        <EditSegment {...props} />
      </Provider>
    )
    expect(screen.queryByText('Marketing Source')).toBeInTheDocument()
    expect(screen.queryByText('Membership Type')).not.toBeInTheDocument()
  })
})
