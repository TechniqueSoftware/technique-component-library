import * as React from 'react';

import MuiSnackbar from '@material-ui/core/Snackbar';
import Box from '@material-ui/core/Box';
import { SnackbarContentProps, SnackbarContent } from './SnackbarContent';

export interface SnackbarProps {
  id: string;
  className?: string;
  show?: boolean;
  'aria-describe-id'?: string;  // Default: 'snackbar'
  autoHideDuration?: number;    // Default: 5000
  variant: 'success' | 'warning' | 'error' | 'info';
  message: string | JSX.Element;
  maxWidth?: number;
  onUndo?: () => void;
  onClose?: () => void;
}

/**
 * NOTE: !!! THIS COMPONENT IS DEPRECATED. ALL NEW USAGES SHOULD USE THE SnackbarProvider and useSnackbar hooks !!!
 */
const Snackbar = (props: SnackbarProps) => {
  const {
    id,
    className,
    show,
    'aria-describe-id': ariaDescribeId = 'snackbar',
    autoHideDuration = 5000,
    message,
    maxWidth = 400,
    onUndo,
    onClose,
    variant,
  } = props;

  const snackbarContentProps: SnackbarContentProps = {
    id,
    message,
    onUndo,
    variant,
    className,
    'aria-describe-id': ariaDescribeId
  };

  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={show}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <SnackbarContent {...snackbarContentProps} />
    </MuiSnackbar>
  );
};

export default Snackbar;
