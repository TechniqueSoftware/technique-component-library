import * as React from 'react';
import MuiDialog, { DialogProps as MuiDialogProps } from '@material-ui/core/Dialog';
import { DialogTitle } from './DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Divider from '@material-ui/core/Divider';
import { ButtonWithIconProps } from '../Buttons/ButtonWithIcon/ButtonWithIcon';
import ButtonWithIcon from '../Buttons/ButtonWithIcon/ButtonWithIcon';

export interface DialogProps {
  id: string;
  dialogTitle:string;
  open:boolean;
  children?: React.ReactNode;
  fullScreen?: boolean;
  fullWidth?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  primaryButtonProps?: ButtonWithIconProps;
  secondaryButtonProps: ButtonWithIconProps;
  onClose : () => void;
}
export default function Dialog(props: DialogProps) {
  const {
    id,
    fullWidth,
    maxWidth,
    fullScreen,
    dialogTitle,
    open,
    onClose,
    primaryButtonProps,
    secondaryButtonProps,
    children
  } = props;

  const muiDialogProps: MuiDialogProps = {
    open,
    fullWidth,
    maxWidth,
    fullScreen,
  };

  const primaryButtonPropsWithDefaults: ButtonWithIconProps = {
    color: 'primary',
    ...primaryButtonProps,
  };

  const secondaryButtonPropsWithDefaults: ButtonWithIconProps = {
    color: 'primary',
    variant: 'text',
    ...secondaryButtonProps
  };

  return (
    <div>
      <MuiDialog
        id={`${id}-dialog`}
        onClose={onClose}
        aria-labelledby={`${id}-dialog-title`}
        {...muiDialogProps}
      >
        <DialogTitle id={`${id}-dialog-title`} onClose={onClose}>
          {dialogTitle}
        </DialogTitle>
        <Divider orientation="horizontal" />
        <DialogContent id={`${id}-dialog-content`}>
          {children}
        </DialogContent>
        <Divider orientation="horizontal" />
        <DialogActions id={`${id}-dialog-actions`}>
          {secondaryButtonProps && <ButtonWithIcon {...secondaryButtonPropsWithDefaults} />}
          {primaryButtonProps && <ButtonWithIcon {...primaryButtonPropsWithDefaults} />}
        </DialogActions>
      </MuiDialog>
    </div>);
}
