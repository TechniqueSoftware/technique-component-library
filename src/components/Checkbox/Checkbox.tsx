import React from 'react';
import { default as MuiCheckbox, CheckboxProps as MuiCheckboxProps } from '@material-ui/core/Checkbox';

export function Checkbox(props: CheckboxProps) {
  const propsWithDefaults: CheckboxProps = {
    color: 'primary',
    ...props,
  };
  return <MuiCheckbox {...propsWithDefaults} />;
}

export type CheckboxProps = MuiCheckboxProps;
