import * as React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import { createCUICStoriesOf } from '../../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../../components/UI-Components/constants';
import { text } from '@storybook/addon-knobs';
import { RadioGroupProps, RadioGroup } from '../../../../components/UI-Components/RadioGroup/RadioGroup';
import clubOsTheme from '../../../../components/UI-Components/storyThemes';
import Box from '@material-ui/core/Box';
import { IconTooltip, IconTooltipProps } from '../../../..';
import HelpRounded from '@material-ui/icons/HelpRounded';

function RadioGroupStory() {

  const [value, setValue] = React.useState('');
  const label = text('Label', 'Select an item');
  const iconTooltipProps: IconTooltipProps = {
    iconProps: {
      component: HelpRounded
    },
    tooltipText: 'Icons can be optionally added to radio buttons.'
  };
  const icon = <IconTooltip {...iconTooltipProps} />;

  const props: RadioGroupProps = {
    label,
    value,
    onChange: (event, value) => setValue(value),
    radioPropsList: [
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: <span>Option 3 {icon}</span>, value: '3' },
      { label: 'Option 4 (disabled)', value: '4', disabled: true }
    ],
    name: 'options'
  };

  return (
    <div>
      <ThemeProvider theme={clubOsTheme}>
        <Box p={2}>
          <RadioGroup {...props} />
        </Box>
      </ThemeProvider>
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render: () => {
      return (<RadioGroupStory />);
    },
    name: 'RadioGroup',
    notes: require('./notes.md').default
  });
