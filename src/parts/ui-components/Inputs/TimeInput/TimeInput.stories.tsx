//@ts-nocheck
import * as React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import * as moment from 'moment';
import { boolean, select, text } from '@storybook/addon-knobs';
import { createCUICStoriesOf } from '../../../../components/UI-Components/utils/utils';
import { MODULE_NAME } from '../../../../components/UI-Components/constants';
import clubOsTheme from '../../../../components/UI-Components/storyThemes';
import { TimeInputProps, TimeInput } from '../../../../components/UI-Components/TimeInput/TimeInput';

type TimeInputStoryProps = {
  label: string;
  variant: 'standard' | 'outlined' | 'filled' | undefined | any;
  disabled: boolean;
};

function TimeInputStory(props: TimeInputStoryProps) {
  const now = moment().format('hh:mm');
  const { label, variant, disabled } = props;
  const [value, setValue] = React.useState(now);

  const timeInputProps: TimeInputProps = {
    label,
    value,
    disabled,
    variant,
    id: 'Time Text Field',
    onChange: (event) => setValue(event.target.value),
  };

  return (
    <div>
      <ThemeProvider theme={clubOsTheme}>
        <TimeInput {...timeInputProps}/>
      </ThemeProvider>
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render: () => {
      const label = text('Label', 'Time Text Field');
      const variant = select('variant', ['standard', 'filled', 'outlined'], 'outlined');
      const disabled = boolean('disabled', false);
      return (<TimeInputStory
        label={label}
        variant={variant}
        disabled={disabled}
      />);
    },
    name: 'TimeInput',
    notes: require('./notes.md').default
  });
