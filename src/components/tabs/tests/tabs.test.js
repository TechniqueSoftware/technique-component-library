import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Tabs from '..'

const tabs = [
  {
    id: '1',
    title: 'Tab 1',
    content: <h3 data-testid='1'>Content 1</h3>
  },
  {
    id: '2',
    title: 'Tab 2',
    content: <h3 data-testid='2'>Content 2</h3>
  },
  {
    id: '3',
    title: 'Tab 3',
    content: <h3 data-testid='3'>Content 3</h3>
  }
]

describe('<Tabs>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Tabs />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders tabs', () => {
    render(<Tabs id='test' tabs={tabs} />)

    const all = screen.queryAllByRole('tab')
    expect(all.length).toBe(tabs.length)

    tabs.forEach((({ id, title }) => {
      const tab = screen.getByText(title)
      expect(tab).toBeInTheDocument()
      expect(screen.getByTestId(id)).toBeInTheDocument()
    }))
  })

  describe('Active', () => {
    it('is active', () => {
      render(<Tabs id='test' tabs={tabs} defaultActive={2} />)
      const all = screen.queryAllByRole('tab')
      all.forEach((tab, i) => {
        if (i === 2) {
          expect(tab).toHaveClass('active')
        } else {
          expect(tab).not.toHaveClass('active')
        }
      })
    })
    it('changes active on tab click', () => {
      render(<Tabs id='test' tabs={tabs} />)

      const all = screen.queryAllByRole('tab')
      userEvent.click(all[1])
      all.forEach((tab, i) => {
        if (i === 1) {
          expect(tab).toHaveClass('active')
        } else {
          expect(tab).not.toHaveClass('active')
        }
      })
    })
  })
})
