import * as React from 'react';
import Popover, { PopoverProps } from '@material-ui/core/Popover';

export interface SimplePopoverProps {
  targetComponent: React.ReactNode;
  PopoverProps?: Partial<PopoverProps>;
  children?: React.ReactNode;
}

function SimplePopover(props: SimplePopoverProps) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event: React.SyntheticEvent) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  const popoverProps: PopoverProps = {
    open,
    anchorEl,
    onClose: handleClose,
    anchorOrigin: {
      vertical: anchorEl ? anchorEl.getBoundingClientRect().height + 4 : 'bottom',
      horizontal: 'left',
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'left',
    },
    ...props.PopoverProps,
  };

  return (
    <div>
      <div onClick={handleClick} data-test={'popover-target-wrapper'}>
        {props.targetComponent}
      </div>
      <Popover {...popoverProps}>
        {props.children}
      </Popover>
    </div>
  );
}

export default SimplePopover;
