import * as React from 'react';
import { default as MuiSwitch, SwitchProps as MuiSwitchProps } from '@material-ui/core/Switch';

export type SwitchProps = MuiSwitchProps;

export default function Switch(props: SwitchProps) {
  const propsWithDefaults: SwitchProps = {
    color: 'primary',
    ...props
  };
  return <MuiSwitch {...propsWithDefaults} />;
}
