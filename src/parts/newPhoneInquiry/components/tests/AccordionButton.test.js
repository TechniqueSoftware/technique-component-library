import React from 'react'
import { render, screen } from '@testing-library/react'

import { TestProvider as Provider } from '@redux/utils'

import AccordionButton from '../AccordionButton'

describe('<Accordion Button />', () => {
  it('it renders', () => {
    render(
      <Provider>
        <AccordionButton eventKey='1' />
      </Provider>
    )
    expect(screen.getByText('Schedule Appointment')).toBeInTheDocument()
  })
})
