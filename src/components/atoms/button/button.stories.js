import React from 'react'

import { COLORS, SIZES, BUTTON_VARIANT } from '@global/constants'

import Button from '.'

export default {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    color: {
      options: Object.values(COLORS),
      defaultValue: COLORS.PRIMARY
    },
    size: {
      options: Object.values(SIZES),
      defaultValue: SIZES.MD
    },
    variant: {
      options: Object.values(BUTTON_VARIANT),
      defaultValue: BUTTON_VARIANT.SOLID
    }
  }
}

const Template = args => <Button {...args} />

export const Regular = Template.bind({})
Regular.args = {
  label: 'Solid Button',
  variant: BUTTON_VARIANT.SOLID
}

export const Outline = Template.bind({})
Outline.args = {
  label: 'Outline Button',
  variant: BUTTON_VARIANT.OUTLINE
}

export const Link = Template.bind({})
Link.args = {
  label: 'Link Button',
  variant: BUTTON_VARIANT.LINK
}

export const Ghost = Template.bind({})
Ghost.args = {
  label: 'Ghost Button',
  variant: BUTTON_VARIANT.GHOST
}
