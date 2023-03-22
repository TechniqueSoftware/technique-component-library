import * as React from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import { IconButton, IconButtonProps } from '@clubos-ui-components/core/dist/components/Buttons/IconButton';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import clubOsTheme from '@clubos-ui-components/core/dist/themes/clubOS';
import CloseIcon from '@material-ui/icons/Close';
import { select, text } from '@storybook/addon-knobs';

type IconButtonStoryProps = {
  'aria-label': string;
  color: 'primary' | 'secondary' | 'default' | null;
};

function IconButtonStory(props:IconButtonStoryProps) {
  const {
    color,
    'aria-label': ariaLabel,
  } = props;

  const IconButtonProps: IconButtonProps = {
    'aria-label': ariaLabel,
  };

  if (color) IconButtonProps.color = color;

  return (
    <div>
        <ThemeProvider theme={clubOsTheme}>
            <IconButton {...IconButtonProps}>
             <CloseIcon />
            </IconButton>
        </ThemeProvider>
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.BUTTONS, module)
  .addCUICStory({
    render: () => {
      const color = select('color', ['', 'primary', 'secondary', 'default'], '');
      const ariaLabel = text('Aria Label', 'Close');
      return (
        <IconButtonStory aria-label={ariaLabel} color={color}/>);
    },
    name: 'IconButton',
    notes: require('./notes.md').default
  });
