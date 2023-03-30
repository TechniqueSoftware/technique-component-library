import * as React from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import clubOsTheme from '../../storyThemes/index';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { SubHeader, SubHeaderProps } from './SubHeader';
import { text, boolean } from '@storybook/addon-knobs';
import Typography from '@material-ui/core/Typography/Typography';
import HistoryIcon from '@material-ui/icons/History';

function render() {

  const reInterestedSubHeaderProps: SubHeaderProps = {
    subheader: text('subheader', 'Re-Interested Threshold'),
    subtext: text('subtext', 'Re-Interested Leads Threshold setting must be between 0-5000'),
    gutterBottom: boolean('gutterBottom', true),
    rightComponent: <HistoryIcon />
  };

  return (
    <div>
      <MuiThemeProvider theme={clubOsTheme}>
        <Box p={2}>
          <SubHeader {...reInterestedSubHeaderProps} />
          <Typography paragraph={true}>
            This text is here only to illustrate the margin below this component.
          </Typography>
        </Box>
      </MuiThemeProvider>
    </div>);
}

createCUICStoriesOf(MODULE_NAME.HEADERS, module)
  .addCUICStory({
    render,
    name: 'SubHeader',
    notes: require('./notes.md').default
  });
