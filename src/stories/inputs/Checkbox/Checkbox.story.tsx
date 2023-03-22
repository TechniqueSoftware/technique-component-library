import * as React from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import { Checkbox, CheckboxProps } from '@clubos-ui-components/core/dist/components/Checkbox/Checkbox';
import { boolean, select } from '@storybook/addon-knobs';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import clubOsTheme from '@clubos-ui-components/core/dist/themes/clubOS';

type CheckboxStoryProps = {
  disabled: boolean;
  color: 'primary' | 'secondary' | 'default' | null;
};

function CheckboxStory(props: CheckboxStoryProps) {
  const {
    disabled,
    color
  } = props;

  const checkboxProps: CheckboxProps = {
    disabled,
  };

  if (color) checkboxProps.color = color;

  return (
    <div>
      <ThemeProvider theme={clubOsTheme}>
        <Checkbox {...checkboxProps} />
      </ThemeProvider>
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render: () => {
      const color = select('color', ['', 'primary', 'secondary', 'default'], '');
      const disabled = boolean('disabled', false);
      return (
        <CheckboxStory
          disabled={disabled}
          color={color}
        />);
    },
    name: 'Checkbox',
    notes: require('./notes.md').default
  });
