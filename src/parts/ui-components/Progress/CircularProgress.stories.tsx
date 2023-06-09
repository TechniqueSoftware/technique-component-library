//@ts-nocheck
import * as React from 'react';
import { createCUICStoriesOf } from '../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../components/UI-Components/constants';
import clubOsTheme from '../../../components/UI-Components/storyThemes';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {
  CircularProgress,
  CircularProgressProps
} from '../../../components/UI-Components/Progress/CircularProgress';
import { select } from '@storybook/addon-knobs';

function render() {
  const color = select('color', ['', 'primary', 'secondary', 'inherit']);
  const props: CircularProgressProps = {};

  if (color) props.color = color;

  return (
    <MuiThemeProvider theme={clubOsTheme}>
      <CircularProgress {...props} />
    </MuiThemeProvider>);
}

createCUICStoriesOf(MODULE_NAME.PROGRESS, module)
  .addCUICStory({
    render,
    name: 'CircularProgress',
    notes: require('./notes.md').default
  });
