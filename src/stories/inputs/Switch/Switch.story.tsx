import * as React from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import Switch, { SwitchProps } from '@clubos-ui-components/core/dist/components/Switch/Switch';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import clubOsTheme from '@clubos-ui-components/core/dist/themes/clubOS';
import { select, boolean } from '@storybook/addon-knobs';

type SwitchStoryProps = {
  color: 'primary' | 'secondary' | 'default';
  disabled: boolean;
};

function SwitchStory(props: SwitchStoryProps) {
  const { color, disabled } = props;
  const switchProps: SwitchProps = { disabled };
  // Only set the property if it has a value. This way we can more accurately depict the default property.
  if (color) switchProps.color = color;
  return (
    <div>
      <ThemeProvider theme={clubOsTheme}>
        <Switch {...switchProps} />
      </ThemeProvider>
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render: () => {
      const disabled = boolean('disabled', false);
      const color = select('color', ['', 'primary', 'default', 'secondary']);
      const switchStoryProps: SwitchStoryProps = {
        disabled,
        color
      };
      return (
        <SwitchStory {...switchStoryProps} />);
    },
    name: 'Switch',
    notes: require('./notes.md').default
  });
