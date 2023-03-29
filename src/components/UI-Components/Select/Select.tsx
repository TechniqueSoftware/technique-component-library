import * as React from 'react';
import { TextField, TextFieldProps } from '../TextField/TextField';

export type SelectProps = TextFieldProps & { isInvisible?: boolean, maxWidth?: number };
// tslint:disable-next-line:function-name
function Select(props: SelectProps) {
  const propsWithDefaults: SelectProps = {
    select: true,
    InputLabelProps: {
      style: { whiteSpace: 'nowrap' }
    },
    margin: 'dense',
    variant: 'outlined' as any,
    ...props,
  };

  return (<TextField {...propsWithDefaults} />);
}

export default Select;
