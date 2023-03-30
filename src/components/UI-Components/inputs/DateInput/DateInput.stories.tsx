//@ts-nocheck
import * as React from 'react';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import * as moment from 'moment';
import { boolean, select, text } from '@storybook/addon-knobs';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import { DateInputProps, DateInput } from '../../DateInput/DateInput';
import clubOsTheme from '../../storyThemes';

type DateInputStoryProps = {
  label: string;
  variant: 'standard' | 'outlined' | 'filled' | undefined | any;
  disabled: boolean;
};

function DateInputStory(props: DateInputStoryProps) {
  const today = moment().format('YYYY-MM-DD');
  const { label, variant, disabled } = props;
  const [value, setValue] = React.useState(today);

  const dateInputProps: DateInputProps = {
    label,
    value,
    disabled,
    variant,
    id: 'Date Text Field',
    onChange: (event) => setValue(event.target.value),
    min: moment('0001-01-01').format('YYYY-MM-DD'),
    max: moment('9999-12-31').format('YYYY-MM-DD')
  };

  return (
    <div>
      <ThemeProvider theme={clubOsTheme}>
        <DateInput {...dateInputProps}/>
      </ThemeProvider>
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render: () => {
      const label = text('Label', 'Date Text Field');
      const variant = select('variant', ['standard', 'filled', 'outlined'], 'outlined');
      const disabled = boolean('disabled', false);
      return (<DateInputStory
        label={label}
        variant={variant}
        disabled={disabled}
      />);
    },
    name: 'DateInput',
    notes: require('./notes.md').default
  });
