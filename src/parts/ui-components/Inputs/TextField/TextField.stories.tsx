import * as React from 'react';
import { createCUICStoriesOf } from '../../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../../components/UI-Components/constants';
import clubOsTheme from '../../../../components/UI-Components/storyThemes';
import { TextField, TextFieldProps } from '../../../../components/UI-Components/TextField/TextField';
import { boolean, select, text } from '@storybook/addon-knobs';
import ThemeProvider from '@material-ui/styles/ThemeProvider';

type TextFieldStoryProps = {
  label: string;
  variant: 'standard' | 'outlined' | 'filled' | undefined | any;
  disabled: boolean;
  hideLabel: boolean;
  appendedText: string;
};

function TextFieldStory(props: TextFieldStoryProps) {
  const { label, variant, disabled, hideLabel, appendedText } = props;
  const [value, setValue] = React.useState('');
  const textFieldProps: TextFieldProps = {
    label,
    variant,
    disabled,
    hideLabel,
    appendedText,
    value,
    onChange: (event) => setValue(event.target.value),
  };

  return (
    <div>
      <ThemeProvider theme={clubOsTheme}>
        <TextField {...textFieldProps} />
      </ThemeProvider>
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render: () => {
      const label = text('Label', 'Search');
      const variant = select('variant', ['standard', 'filled', 'outlined'], 'outlined');
      const disabled = boolean('disabled', false);
      const hideLabel = boolean('hide label', false);
      const appendedText = text('append text', '');
      return (<TextFieldStory
        label={label}
        variant={variant}
        disabled={disabled}
        hideLabel={hideLabel}
        appendedText={appendedText}
      />);
    },
    name: 'TextField',
    notes: require('./notes.md').default
  });
