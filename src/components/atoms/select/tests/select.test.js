import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Select from '..'

const props = {
  name: 'selectName',
  label: 'Select Label',
  onSelect: jest.fn(),
  selected: { value: 1, name: 'Option1' },
  options: [
    { value: '1', name: 'Option1' },
    { value: '2', name: 'Option2' },
    { value: '3', name: 'Option3' }
  ],
  required: true,
  disabled: false
}

describe('<Select/>', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<Select {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('it renders', () => {
    render(<Select {...props} />)
    expect(screen.queryByRole('combobox')).toBeInTheDocument()
  })

  it('renders options', () => {
    render(<Select {...props} />)
    props.options.forEach(o => {
      expect(screen.queryByText(o.name)).toBeInTheDocument()
    })
    expect(screen.getAllByRole('option').length).toEqual(props.options.length)
  })

  it('is selected', () => {
    render(<Select {...props} selected={{ value: 3, name: 'Option3' }} />)
    const options = screen.getAllByRole('option')

    expect(options[0].selected).toBeFalsy()
    expect(options[1].selected).toBeFalsy()
    expect(options[2].selected).toBeTruthy()
  })

  it('selects another option', async () => {
    render(<Select {...props} />)
    const select = screen.getByRole('combobox')

    const option = props.options[1]

    await userEvent.selectOptions(select, [option.value])

    expect(props.onSelect).toHaveBeenCalledWith({
      name: props.name,
      value: option,
      error: '',
      validated: false
    })
  })
})
