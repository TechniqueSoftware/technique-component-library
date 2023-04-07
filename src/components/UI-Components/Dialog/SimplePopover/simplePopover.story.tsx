import * as React from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import clubOsTheme from '../../storyThemes';
import SimplePopover,{ SimplePopoverProps} from '../../SimplePopover/SimplePopover';
import ButtonWithIcon from '../../Buttons/ButtonWithIcon/ButtonWithIcon';
import { MuiThemeProvider } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';

function render() {

  const simplePopoverProps: SimplePopoverProps = {
    targetComponent: <ButtonWithIcon>Target Component</ButtonWithIcon>
  };

  return (
    <div>
      <MuiThemeProvider theme={clubOsTheme}>
        <Box p={2}>
          <SimplePopover {...simplePopoverProps}>
            <DialogContent>
              <p>Any content can be added here</p>
            </DialogContent>
          </SimplePopover>
        </Box>
      </MuiThemeProvider>
    </div>);
}

createCUICStoriesOf(MODULE_NAME.DIALOGS, module)
  .addCUICStory({
    render,
    name: 'SimplePopover',
    notes: require('./notes.md').default
  });
