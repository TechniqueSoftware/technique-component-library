import * as React from 'react';
import { createCUICStoriesOf } from '../../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../../components/UI-Components/constants';
import clubOsTheme from '../../../../components/UI-Components/storyThemes/index';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { SectionHeader, SectionHeaderProps } from '../../../../components/UI-Components/Headers/SectionHeader/SectionHeader';
import { text, boolean } from '@storybook/addon-knobs';
import Typography from '@material-ui/core/Typography/Typography';
import HistoryIcon from '@material-ui/icons/History';

function render() {

  const sectionHeaderProps: SectionHeaderProps = {
    header: text('header', 'Membership Sale Date'),
    subtitle: text('subtitle', 'Define which date should be used to calculate membership closes in analytics'),
    gutterBottom: boolean('gutterBottom', true),
    rightComponent: <HistoryIcon />
  };

  return (
    <div>
      <MuiThemeProvider theme={clubOsTheme}>
        <Box p={2}>
          <SectionHeader {...sectionHeaderProps} />
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
    name: 'SectionHeader',
    notes: require('./notes.md').default
  });
