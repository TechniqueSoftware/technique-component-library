import * as React from 'react';
import { TextField, TextFieldProps } from '../TextField/TextField';

export type TimeInputProps = TextFieldProps;

export function TimeInput(props: TimeInputProps) {
  const propsToPassOn: TextFieldProps = {
    ...props,
    InputLabelProps: {
      ...props.InputLabelProps,
      shrink: true
    },
    type: 'time'
  };

  return <TextField {...propsToPassOn} />;
}
