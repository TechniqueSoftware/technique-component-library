import * as React from 'react';
import Select, { SelectProps } from './Select';
import { MenuItem } from '../MenuItem/MenuItem';

export type SelectWithNoMenuProps = {
  id: string;
  open: boolean,
  value: string,
  maxWidth?: number,
} & SelectProps;

export function SelectWithNoMenu(props: SelectWithNoMenuProps) {
  const {
    open,
    value,
    SelectProps,
  } = props;

  function handleKeyDown(event: React.KeyboardEvent) {
    const code = event.keyCode || event.which;

    if (code === 13) {
      // Typing as any here as resolving the type difference between KeyboardEvents and SyntheticEvent isn't worth the effort for our usage.
      props.onClick(event as any);
    }
  }

  const selectProps: SelectProps = {
    ...props,
    onKeyDown: handleKeyDown,
    SelectProps: {
      ...SelectProps,
      open,
      value,
      renderValue: () => value,
      MenuProps: { style: { display: 'none' } }
    }
  };

  return (
    <Select {...selectProps}>
      <MenuItem value={value}>{value}</MenuItem>
    </Select>
  );
}
