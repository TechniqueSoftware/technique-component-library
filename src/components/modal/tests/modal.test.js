import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Modal from '..'

describe('<Modal/>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Modal />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('should render', () => {
    render(<Modal show>Modal Content</Modal>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should not render', () => {
    render(<Modal show={false}>Modal Content</Modal>)
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders Footer', () => {
    render(
      <Modal show>
        <Modal.Footer>Footer</Modal.Footer>
      </Modal>)
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('renders body', () => {
    render(
      <Modal show>
        <Modal.Body>Body</Modal.Body>
      </Modal>)
    expect(screen.getByText('Body')).toBeInTheDocument()
  })

  it('renders title', () => {
    render(
      <Modal show>
        <Modal.Title>Title</Modal.Title>
      </Modal>)
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  describe('Header', () => {
    const hide = jest.fn()
    it('renders header', () => {
      render(
        <Modal show>
          <Modal.Header>Header</Modal.Header>
        </Modal>)
      expect(screen.getByText('Header')).toBeInTheDocument()
    })

    it('renders close button', () => {
      render(
        <Modal show>
          <Modal.Header onHide={hide}>Header</Modal.Header>
        </Modal>)
      expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('hides the modal', () => {
      render(
        <Modal show>
          <Modal.Header onHide={hide}>Header</Modal.Header>
        </Modal>)
      userEvent.click(screen.getByRole('button'))
      expect(hide).toHaveBeenCalled()
    })
  })
})
