import React, { useState } from 'react'

import Offcanvas from '.'
import { Button } from '../atoms'

export default {
  title: 'Components/Offcanvas',
  component: Offcanvas
}

const Template = args => {
  const [show, setShow] = useState(false)
  const { children } = args

  const toggleShow = val => setShow(val)

  return (
    <>
      <h1>Offcanvas</h1>
      <p>Change <strong><em>show</em></strong> in controls to view the offcanvas</p>

      <Button
        label='Show offcanvas'
        onClick={() => toggleShow(true)}
      />

      <Offcanvas
        {...args}
        show={show}
        handleClose={() => toggleShow(false)}
      >
        <p>{children}</p>
      </Offcanvas>
    </>
  )
}

export const Default = Template.bind({})
Default.args = {
  close: true,
  title: 'hola',
  children: 'something to write as children here'
}
