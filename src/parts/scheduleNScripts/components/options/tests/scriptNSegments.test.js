import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'
import { TestProvider as Provider } from '@redux/utils'
import { data, locationState, dynamicTagState, script } from './mock'

import ScriptsModal from '../scriptsModal'

jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
  global: {
    locations: locationState,
    dynamicTags: dynamicTagState
  },
  scheduleNScripts: { touchpointCrud: { data, action: 1 } }
})
)

describe('<ScriptNSegments />', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <ScriptsModal />
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('does not render tabs if segmentation unavailable', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(cb => cb({
      global: {
        locations: locationState,
        dynamicTags: dynamicTagState
      },
      scheduleNScripts: {
        touchpointCrud: {
          data: { ...data, followUpStatus: 8, scripts: [{ ...script, followUpStatus: 8 }] },
          action: 1
        }
      }
    })
    )
    render(
      <Provider>
        <ScriptsModal />
      </Provider>
    )
    expect(screen.queryByText('Scripts')).not.toBeInTheDocument()
    expect(screen.queryByText('Segments')).not.toBeInTheDocument()
  })
})
