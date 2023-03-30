//@ts-nocheck
import * as React from 'react';
import { createCUICStoriesOf } from '../../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../../components/UI-Components/constants';
import { IconButton, IconButtonProps } from '../../../../components/UI-Components/Buttons/IconButton/IconButton';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import clubOsTheme from '../../../../components/UI-Components/storyThemes/index'
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
