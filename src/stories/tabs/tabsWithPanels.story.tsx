import * as React from 'react';
import { clubOsTheme } from '@clubos-ui-components/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { createCUICStoriesOf } from '../utils/utils';
import { MODULE_NAME } from '../constants';
import { text } from '@storybook/addon-knobs';
import { TabsWithPanels, TabsWithPanelsProps } from '../../components/Tabs/TabsWithPanels';
import Typography from '@material-ui/core/Typography';

function render() {
  const tab3Text = text('Tab 3 label (for label length experimentation)', 'Tab 3');

  const tabsWithPanelsProps: TabsWithPanelsProps = {
    initialTab: '1',
    tabsAriaLabel: 'storybook-example-tabs',
    tabAndPanelPropsList: [{
      renderContent: () => <Typography>This component supports passing in any component/content into this content area.
        The tab bar and content area takes up 100% width of any container it's placed in.</Typography>,
      id: '1',
      label: 'Tab 1'
    },
      {
        renderContent: () => <Box height={800}>
          <Typography>Tab 2 content with 800px height</Typography>
        </Box>,
        id: '2',
        label: 'Tab 2'
      },
      {
        renderContent: () => <Typography>Tab 3 content</Typography>,
        id: '3',
        label: tab3Text
      },
      {
        renderContent: () => <Typography>Tab 4 content</Typography>,
        id: '4',
        label: 'Tab 4'
      },
      {
        renderContent: () => <Typography>Tab 5 content</Typography>,
        id: '5',
        label: 'Tab 5'
      }
    ]

  };
  return (
    <div>
      <MuiThemeProvider theme={clubOsTheme}>
        <Box p={2}>
          <TabsWithPanels {...tabsWithPanelsProps} />
        </Box>
      </MuiThemeProvider>
    </div>);
}

createCUICStoriesOf(MODULE_NAME.TABS, module)
  .addCUICStory({
    render,
    name: 'TabsWithPanels',
    notes: require('./notes.md').default
  });
