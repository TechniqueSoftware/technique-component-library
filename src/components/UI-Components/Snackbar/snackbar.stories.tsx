import * as React from 'react';
import clubOsTheme from '../storyThemes';
import { text, select, number, boolean } from '@storybook/addon-knobs';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createCUICStoriesOf } from '../utils/utils';
import { MODULE_NAME } from '../constants';
import { useSnackbar, SnackbarProvider, EnqueueSnackbarParams } from './SnackbarProvider';
import ButtonWithIcon from '../Buttons/ButtonWithIcon/ButtonWithIcon';

const SnackbarStory = () => {
  const message = text('Message', 'Follow-up sent!');
  const variant = select(
    'Variant',
    ['success', 'warning', 'error', 'info'],
    'success',
  );
  const autoHideDuration = number('Auto hide duration', 5000);
  const maxWidth = number('Max width', 400);
  const undoButton = boolean('Undo button', true);
  const vertical = select('Vertical', ['top', 'bottom'], 'bottom');
  const horizontal = select('Horizontal', ['left', 'center', 'right'], 'center');

  const { enqueueSnackbar } = useSnackbar();

  const enqueueSnackbarParams: EnqueueSnackbarParams = {
    autoHideDuration,
    maxWidth,
    message,
    variant,
    anchorOrigin: {
      vertical,
      horizontal
    },
    id: 'storybook-snackbar'
  };

  if (undoButton) {
    enqueueSnackbarParams.onUndo = () => window.alert(
      `Undo button clicked!. This component allows us to configure whatever behavior we want when the undo button is clicked`);
  }

  const handleShow = () => enqueueSnackbar(enqueueSnackbarParams);

  return (
    <ButtonWithIcon onClick={() => handleShow()} color={'primary'}>
      Display Snackbar
    </ButtonWithIcon>
  );
};

createCUICStoriesOf(MODULE_NAME.SNACKBARS, module)
  .addCUICStory({
    render() {
      const maxSnack = number('Max snackbars', 3);

      return <ThemeProvider theme={clubOsTheme}>
        <SnackbarProvider maxSnack={maxSnack}>
                  <SnackbarStory />
                </SnackbarProvider>
              </ThemeProvider>;
    },
    name: 'Snackbar',
    notes: require('./notes.md').default
  });
