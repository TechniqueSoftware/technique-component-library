import * as React from 'react';
// tslint:disable-next-line:no-duplicate-imports
import { useState } from 'react';
import { createCUICStoriesOf } from '../../utils/utils';
import { MODULE_NAME } from '../../constants';
import clubOsTheme from '../../storyThemes';
import ThemeProvider from '@material-ui/styles/ThemeProvider';
import Grid from '@material-ui/core/Grid';
import { boolean, select, text } from '@storybook/addon-knobs';
import { StartAndEndInput, StartAndEndInputProps } from '../../StartAndEndInput/StartAndEndInput';

require('moment-timezone');

function StartAndEndInputStory() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const helperText = text('Helper text', '');
  const startDateHelperText = text('Start date helper text', '');
  const endDateHelperText = text('End date helper text', '');
  const error = boolean('With error', false);
  const type = select('type', ['time', 'date'], 'time');
  const variant = select('variant', ['standard', 'filled', 'outlined'], 'outlined');

  const props: StartAndEndInputProps = {
    type,
    variant,
    handleEndDateChange: (event) => setEndDate(event.target.value),
    handleStartDateChange: (event) => setStartDate(event.target.value),
    id: 'startAndEndInputId',
    isInvisible: false,
    startDateProps: {
      error,
      helperText,
      startDateHelperText,
      value: startDate,
    },
    endDateProps: {
      error,
      helperText,
      endDateHelperText,
      value: endDate,
    }
  };

  return (
    <div>
      <ThemeProvider theme={clubOsTheme}>
        <Grid container spacing={1}>
          <StartAndEndInput {...props} />
        </Grid>
      </ThemeProvider>
    </div>
  );
}

createCUICStoriesOf(MODULE_NAME.INPUTS, module)
  .addCUICStory({
    render: () => {
      return (<StartAndEndInputStory />);
    },
    name: 'StartAndEndInput',
    notes: require('./notes.md').default
  });
