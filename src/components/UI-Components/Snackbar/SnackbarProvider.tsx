import * as React from 'react';
import * as notistack from 'notistack';
import { SnackbarContent, SnackbarContentProps } from './SnackbarContent';
import { SnackbarOrigin } from '@material-ui/core/Snackbar/Snackbar';

export type EnqueueSnackbarParams = {
  id: string;
  message: string | React.ReactNode;
  variant: 'success' | 'warning' | 'error' | 'info';
  autoHideDuration?: number;
  maxWidth?: number;
  onUndo?: () => void;
  anchorOrigin?: SnackbarOrigin;
};

/**
 * Returns a function that creates a SnackbarContent using a key. The key is used to handle identify the specific Snackbar instance for
 * actions like closing.
 */
export function createSnackbarContentFactory(params: SnackbarContentProps & { closeSnackbar: (key: number) => void }) {
  const {
    onUndo,
    closeSnackbar,
    ...restOfSnackbarContentProps
  } = params;

  return (key: number) => {
    const onClose = () => closeSnackbar(key);
    const snackbarContentProps: SnackbarContentProps = {
      onClose,
      ...restOfSnackbarContentProps,
    };
    if (onUndo) {
      snackbarContentProps.onUndo = () => {
        onClose();
        onUndo();
      };
    }
    return <SnackbarContent {...snackbarContentProps} />;
  };
}

/**
 * This function wraps the notistack useSnackbar and simplifies the implementation by setting up the content of the snackbar and setting
 * our preferred default values.
 */
export function useSnackbar() {
  const { closeSnackbar, enqueueSnackbar: notiEnqueueSnackbar } = notistack.useSnackbar();

  function enqueueSnackbar(params: EnqueueSnackbarParams) {
    const {
      id,
      message,
      variant,
      autoHideDuration = 5000,
      maxWidth = 400,
      onUndo,
      anchorOrigin = { vertical: 'bottom' as 'bottom', horizontal: 'center' as 'center' }
    } = params;

    const options: notistack.OptionsObject = {
      autoHideDuration,
      anchorOrigin,
      content: createSnackbarContentFactory({
        id,
        message,
        variant,
        maxWidth,
        onUndo,
        closeSnackbar
      })
    };

    return notiEnqueueSnackbar(message, options);

  }

  return { closeSnackbar, enqueueSnackbar };
}

export const SnackbarProvider = notistack.SnackbarProvider;
