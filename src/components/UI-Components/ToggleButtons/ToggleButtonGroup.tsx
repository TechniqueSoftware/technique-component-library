//@ts-nocheck
import * as React from 'react';
import { default as MuiToggleButtonGroup, ToggleButtonGroupProps } from '@material-ui/lab/ToggleButtonGroup';

const ToggleButtonGroup = (props: ToggleButtonGroupProps): JSX.Element => {
  const applyProps: ToggleButtonGroupProps = {
    ...props,
    size: 'small',
  };
  return (
    <MuiToggleButtonGroup {...applyProps}/>
  );
};

export {
  ToggleButtonGroupProps
};

export default ToggleButtonGroup;
