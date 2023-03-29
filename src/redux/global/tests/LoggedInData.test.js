import React from 'react'
import * as redux from 'react-redux'
import { render, screen } from '@testing-library/react'

import { TestProvider as Provider } from '@redux/utils'

import { state, loadingState, parsedPermissions } from './mock'

import LoggedInData from '../components/loggedInData'

const newState = { ...state, global: { ...state.global, permissions: parsedPermissions } }
jest.spyOn(redux, 'useSelector').mockImplementation(f => f(newState))

describe('<LoggedInData/>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(
      <Provider>
        <LoggedInData>
          <div>test</div>
        </LoggedInData>
      </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render the child div after fetching the data', () => {
    render(
      <Provider>
        <LoggedInData permissions={{ user: ['TruePermission'], feature: [] }}>
          <div>test</div>
        </LoggedInData>
      </Provider>
    )
    const child = screen.getByText('test')
    expect(child).toBeInTheDocument()
    expect(child.parentNode).toHaveClass('pkg-library')
  })

  it('does not render when restricted', () => {
    render(
      <Provider>
        <LoggedInData restrictedFromRoles={[3]}>
          <div>test</div>
        </LoggedInData>
      </Provider>
    )
    const child = screen.queryByText('test')
    expect(child).not.toBeInTheDocument()
  })

  it('does not render when permisson is DENY', () => {
    render(
      <Provider>
        <LoggedInData permissions={{ user: ['FalsePermission'], feature: [] }}>
          <div>test</div>
        </LoggedInData>
      </Provider>
    )
    const child = screen.queryByText('test')
    expect(child).not.toBeInTheDocument()
  })

  it('renders spinner', () => {
    jest.spyOn(redux, 'useSelector').mockImplementation(f => f(loadingState))
    render(
      <Provider>
        <LoggedInData>
          <div>test</div>
        </LoggedInData>
      </Provider>
    )
    const child = screen.queryByRole('status')
    expect(child).toBeInTheDocument()
    expect(child.parentNode).toHaveClass('pkg-library')
  })
})
