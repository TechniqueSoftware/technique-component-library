import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { COLORS, SIZES, BUTTON_VARIANT } from '@global/constants'

import Button from '..'

const onClick = jest.fn()

describe('<Button />', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Button label='Button' onClick={onClick} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('has correct text', () => {
    render(<Button label='Button' onClick={onClick} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  describe('action', () => {
    it('is disabled', () => {
      render(<Button label='Button' onClick={onClick} disabled />)
      userEvent.click(screen.getByRole('button'))
      expect(onClick).not.toHaveBeenCalled()
    })

    it('calls function on click', () => {
      render(<Button label='Button' onClick={onClick} />)
      userEvent.click(screen.getByRole('button'))
      expect(onClick).toHaveBeenCalledTimes(1)
    })
  })

  describe('button variant', () => {
    it('is solid by default', () => {
      render(<Button label='Button' onClick={onClick} />)
      expect(screen.getByRole('button')).toHaveClass('btn-primary')
    })

    it('is SOLID', () => {
      render(<Button label='Button' onClick={onClick} variant={BUTTON_VARIANT.SOLID} />)
      expect(screen.getByRole('button')).toHaveClass('btn-primary')
    })

    it('is OUTLINE', () => {
      render(<Button label='Button' onClick={onClick} variant={BUTTON_VARIANT.OUTLINE} />)
      expect(screen.getByRole('button')).toHaveClass('btn-outline-primary')
    })

    it('is LINK', () => {
      render(<Button label='Button' onClick={onClick} variant={BUTTON_VARIANT.LINK} />)
      expect(screen.getByRole('button')).toHaveClass('btn-link')
    })

    it('is GHOST', () => {
      render(<Button label='Button' onClick={onClick} variant={BUTTON_VARIANT.GHOST} />)
      expect(screen.getByRole('button')).toHaveClass('bg-transparent')
    })
  })

  describe('button color', () => {
    it('is primary by default', () => {
      render(<Button label='Button' onClick={onClick} />)
      expect(screen.getByRole('button')).toHaveClass('btn-primary')
    })

    it('is PRIMARY', () => {
      render(<Button label='Button' onClick={onClick} color={COLORS.PRIMARY} />)
      expect(screen.getByRole('button')).toHaveClass('btn-primary')
    })

    it('is SECONDARY', () => {
      render(<Button label='Button' onClick={onClick} color={COLORS.SECONDARY} />)
      expect(screen.getByRole('button')).toHaveClass('btn-secondary')
    })

    it('is SUCCESS', () => {
      render(<Button label='Button' onClick={onClick} color={COLORS.SUCCESS} />)
      expect(screen.getByRole('button')).toHaveClass('btn-success')
    })

    it('is DANGER', () => {
      render(<Button label='Button' onClick={onClick} color={COLORS.DANGER} />)
      expect(screen.getByRole('button')).toHaveClass('btn-danger')
    })

    it('is WARNING', () => {
      render(<Button label='Button' onClick={onClick} color={COLORS.WARNING} />)
      expect(screen.getByRole('button')).toHaveClass('btn-warning')
    })

    it('is INFO', () => {
      render(<Button label='Button' onClick={onClick} color={COLORS.INFO} />)
      expect(screen.getByRole('button')).toHaveClass('btn-info')
    })

    it('is LIGHT', () => {
      render(<Button label='Button' onClick={onClick} color={COLORS.LIGHT} />)
      expect(screen.getByRole('button')).toHaveClass('btn-light')
    })

    it('is DARK', () => {
      render(<Button label='Button' onClick={onClick} color={COLORS.DARK} />)
      expect(screen.getByRole('button')).toHaveClass('btn-dark')
    })
  })

  describe('button size', () => {
    it('is small', () => {
      render(<Button label='Button' onClick={onClick} size={SIZES.SM} />)
      expect(screen.getByRole('button')).toHaveClass('btn-sm')
    })

    it('is large', () => {
      render(<Button label='Button' onClick={onClick} size={SIZES.LG} />)
      expect(screen.getByRole('button')).toHaveClass('btn-lg')
    })
  })
})
