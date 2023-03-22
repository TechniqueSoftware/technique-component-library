import * as React from 'react';
import Popover, { PopoverProps } from '@material-ui/core/Popover';
import { SelectWithNoMenu, SelectWithNoMenuProps } from './SelectWithNoMenu';

export interface SelectCustomProps {
  children?: React.ReactNode;
  maxWidth?: number;
  open: boolean;
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
  hideLabel?: boolean;
  onMenuOpen: () => void;
  onMenuClose: () => void;
}

export function SelectCustom(props: SelectCustomProps) {

  const [anchorEl, setAnchorEl] = React.useState<Element>(null);

  const {
    open = false,
    id,
    disabled,
    label,
    value,
    children,
    onMenuOpen,
    onMenuClose,
    maxWidth,
    hideLabel = false
  } = props;

  const popoverProps: PopoverProps = {
    open,
    anchorEl,
    onClose: onMenuClose,
    id: `${id}-popover`,
    anchorOrigin: {
      vertical: anchorEl ? anchorEl.getBoundingClientRect().height + 4 : 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
  };

  function handleOpenMenuClick(event: React.SyntheticEvent) {
    setAnchorEl(event.currentTarget);
    onMenuOpen();
  }

  const selectWithNoMenuProps: SelectWithNoMenuProps = {
    open,
    value,
    maxWidth,
    disabled,
    label,
    hideLabel,
    id: `${id}-select`,
    onClick: handleOpenMenuClick
  };

  return <React.Fragment>
    <SelectWithNoMenu {...selectWithNoMenuProps} />
    <Popover {...popoverProps}>
      {children}
    </Popover>
  </React.Fragment>;
}
