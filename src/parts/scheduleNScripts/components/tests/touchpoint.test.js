import React from 'react'
import { render, screen } from '@testing-library/react'
import * as redux from 'react-redux'

import userEvent from '@testing-library/user-event'

import { TestProvider as Provider } from '@redux/utils'

import TouchPoint from '../../statusSchedules/touchpoint'

const editState = {
  scheduleNScripts: {
    canEditScripts: true,
    canEditSchedules: true,
    innerPermissions: {
      automaticFollowUpAction: true,
      followUpSegmentsAction: false
    }
  }
}

const handleOptions = jest.fn()
const handleScript = jest.fn()

describe('Schedule and scripts <StatusSchedules />', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <TouchPoint />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  describe('renders clock', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(editState))
    it('yes', () => {
      const tp = { followUpTime: '12:00' }
      render(
        <Provider>
          <TouchPoint touchpoint={tp} />
        </Provider>
      )
      expect(screen.getByLabelText('BsClock')).toBeInTheDocument()
    })

    it('no', () => {
      render(
        <Provider>
          <TouchPoint />
        </Provider>
      )
      expect(screen.queryByLabelText('BsClock')).not.toBeInTheDocument()
    })
  })

  describe('render replay', () => {
    it('yes', () => {
      render(
        <Provider>
          <TouchPoint replay />
        </Provider>
      )
      const icon = screen.getByLabelText('BsArrowClockwise')
      expect(icon).toBeInTheDocument()
    })

    it('no', () => {
      render(
        <Provider>
          <TouchPoint />
        </Provider>
      )
      const icon = screen.queryByLabelText('BsArrowClockwise')
      expect(icon).not.toBeInTheDocument()
    })
  })

  describe('options', () => {
    it('renders', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(editState))
      render(
        <Provider>
          <TouchPoint handleOptions={handleOptions} />
        </Provider>
      )

      const dots = screen.getByLabelText('BsThreeDotsVertical')
      expect(dots).toBeInTheDocument()
      expect(dots).not.toHaveClass('hidden')
    })

    it('calls options function', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(editState))
      render(
        <Provider>
          <TouchPoint handleOptions={handleOptions} />
        </Provider>
      )
      userEvent.click(screen.queryByLabelText('BsThreeDotsVertical'))
      expect(handleOptions).toHaveBeenCalled()
    })
  })

  describe('phone scripts', () => {
    it('renders', () => {
      const tp = {
        scripts: [{ actionType: 1 }]
      }
      render(
        <Provider>
          <TouchPoint touchpoint={tp} handleScript={handleScript} />
        </Provider>
      )
      expect(screen.getByLabelText('BsTelephone')).toBeInTheDocument()
    })

    it('does not renders', () => {
      render(
        <Provider>
          <TouchPoint />
        </Provider>
      )
      expect(screen.queryByLabelText('BsTelephone')).not.toBeInTheDocument()
    })

    it('calls phone function', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(editState))
      const tp = {
        scripts: [{ actionType: 1 }]
      }
      render(
        <Provider>
          <TouchPoint touchpoint={tp} handleScript={handleScript} />
        </Provider>
      )
      userEvent.click(screen.queryByLabelText('BsTelephone'))
      expect(handleScript).toHaveBeenCalled()
    })
  })

  describe('email scripts', () => {
    it('renders', () => {
      const tp = {
        scripts: [{ actionType: 2 }]
      }
      render(
        <Provider>
          <TouchPoint touchpoint={tp} />
        </Provider>
      )
      expect(screen.getByLabelText('BsEnvelope')).toBeInTheDocument()
    })

    it('does not renders', () => {
      render(
        <Provider>
          <TouchPoint />
        </Provider>
      )
      expect(screen.queryByLabelText('BsEnvelope')).not.toBeInTheDocument()
    })

    it('calls email function', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(editState))
      const tp = {
        scripts: [{ actionType: 2 }]
      }
      render(
        <Provider>
          <TouchPoint touchpoint={tp} handleScript={handleScript} />
        </Provider>
      )
      userEvent.click(screen.queryByLabelText('BsEnvelope'))
      expect(handleScript).toHaveBeenCalled()
    })
  })

  describe('sms scripts', () => {
    it('renders', () => {
      const tp = {
        scripts: [{ actionType: 3 }]
      }
      render(
        <Provider>
          <TouchPoint touchpoint={tp} />
        </Provider>
      )
      expect(screen.getByLabelText('BsChatDots')).toBeInTheDocument()
    })

    it('does not renders', () => {
      render(
        <Provider>
          <TouchPoint />
        </Provider>
      )
      expect(screen.queryByLabelText('BsChatDots')).not.toBeInTheDocument()
    })

    it('calls sms function', () => {
      jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(editState))
      const tp = {
        scripts: [{ actionType: 3 }]
      }
      render(
        <Provider>
          <TouchPoint touchpoint={tp} handleScript={handleScript} />
        </Provider>
      )
      userEvent.click(screen.queryByLabelText('BsChatDots'))
      expect(handleScript).toHaveBeenCalled()
    })
  })

  describe('no scripts', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb(editState))
    it('renders warning signe', () => {
      render(<TouchPoint />)
      expect(screen.queryByLabelText('BsExclamationTriangleFill')).toBeInTheDocument()
    })

    it('calls handle scripts', () => {
      render(<TouchPoint handleScript={handleScript} />)
      userEvent.click(screen.queryByLabelText('BsExclamationTriangleFill'))
      expect(handleScript).toHaveBeenCalled()
    })
  })

  describe('text', () => {
    it('is immediate', () => {
      const tp = {
        followUpSeqNum: 1,
        daysTillNext: 0,
        dayNum: 0
      }
      render(<TouchPoint touchpoint={tp} />)
      expect(screen.getByText('Immediate')).toBeInTheDocument()
      expect(screen.queryByText('Day')).not.toBeInTheDocument()
    })

    it('is day', () => {
      const tp = {
        dayNum: 1,
        daysTillNext: 1
      }
      render(
        <Provider>
          <TouchPoint touchpoint={tp} />
        </Provider>
      )
      expect(screen.getByText(`Day ${tp.daysTillNext}`)).toBeInTheDocument()
      expect(screen.queryByText('Immediate')).not.toBeInTheDocument()
    })
  })
})
