import * as React from 'react';
import { TextField, TextFieldProps } from '../TextField/TextField';

export type DateInputProps = TextFieldProps;

export function DateInput(props: DateInputProps) {
  const propsToPassOn: TextFieldProps = {
    ...props,
    InputLabelProps: {
      ...props.InputLabelProps,
      shrink: true
    },
    type: 'date'
  };

  return <TextField {...propsToPassOn} />;
}
